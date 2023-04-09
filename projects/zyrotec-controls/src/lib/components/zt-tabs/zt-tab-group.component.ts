import { Component, ContentChildren, QueryList, OnInit, AfterContentInit, ElementRef, ViewChild, AfterViewInit, ViewChildren, OnDestroy, NgZone, TemplateRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ZtTabComponent } from './zt-tab/zt-tab.component';
import { ElementBoundsService } from '../../@core/services/element-bounds.service';
import { Observable, Subject, Subscription, debounceTime, fromEvent, takeUntil } from 'rxjs';
import { DomPortal, Portal } from '@angular/cdk/portal';

@Component({
    selector: 'zt-tab-group',
    templateUrl: './zt-tab-group.component.html',
    styleUrls: ['./zt-tab-group.component.scss']
})
export class ZtTabGroupComponent implements OnInit, OnDestroy, AfterContentInit, AfterViewInit
{
    @ContentChildren(ZtTabComponent)
    public tabs!: QueryList<ZtTabComponent>;

    @ViewChild('tabBarWrapper', { static: true })
    public tabBarWrapper!: ElementRef<HTMLElement>;

    @ViewChildren('tabBarItem', { emitDistinctChangesOnly: false })
    public tabBarItems!: QueryList<ElementRef<HTMLButtonElement>>;

    @ViewChild('tabContentWrapper', { read: ElementRef<HTMLElement>, static: true })
    public tabContentWrapper!: ElementRef<HTMLElement>

    @ViewChild('tabContent', { read: ElementRef<HTMLElement> })
    public tabContent!: ElementRef<HTMLElement>;

    public tabItemsArray!: Array<ElementRef<HTMLButtonElement>>;

    public selectedTabIndex: number = 0;
    public tabBarSliderWidth: number = 0;
    public tabBarItemSliderOffsetLeft: number = 0;
    public tabBarOffsetLeft: number = 0;

    public isScrollLeftButtonVisible: boolean = false;
    public isScrollRightButtonVisible: boolean = false;
    public isLeftRightMask: boolean = false;
    public isLeftMask: boolean = false;
    public isRightMask: boolean = false;

    private _resizeObservable$!: Observable<Event>;
    private _loadObservable$!: Observable<Event>;

    private _resizeSubscription$!: Subscription;
    private _loadSubscription$!: Subscription;

    constructor(private _host: ElementRef, private zone: NgZone, private _elementBoundsService: ElementBoundsService) { }

    public ngOnInit(): void
    {
        this._resizeObservable$ = fromEvent(window, 'resize');

        this._resizeSubscription$ = this._resizeObservable$.subscribe(
            (event) =>
            {
                this.showHideScrollButtons();
            }
        );

        this._loadObservable$ = fromEvent(window, 'load');

        this._loadSubscription$ = this._loadObservable$.subscribe(
            (event) =>
            {
                this.showHideScrollButtons();
            }
        );
    }

    public ngOnDestroy(): void
    {
        this._resizeSubscription$.unsubscribe();
        this._loadSubscription$.unsubscribe();
    }

    public ngAfterViewInit(): void
    {
        this.tabBarSliderWidth = this._elementBoundsService.getElementWidth(this.tabBarItems.first.nativeElement);
        this.tabBarItemSliderOffsetLeft = this.tabBarItems.first.nativeElement.offsetLeft;

        this.tabItemsArray = this.tabBarItems.toArray();
    }

    public ngAfterContentInit(): void
    {
        let activeTabs = this.tabs.filter(
            (tab) =>
            {
                return tab.isActive == true;
            }
        );

        this.tabs.first.isActive = (activeTabs.length == 0) ? true : false;
    }

    ///
    ///Changes Active Tabs
    ///
    public onSelectTab(tab: ZtTabComponent, tabBarItem: HTMLButtonElement): void
    {
        let tabsArray = this.tabs.toArray();

        for(let i = 0; i < tabsArray.length; i++)
        {
            tabsArray[i].isActive = false;
        }

        tab.isActive = true;

        this.tabBarSliderWidth = tabBarItem.clientWidth;
        this.tabBarItemSliderOffsetLeft = tabBarItem.offsetLeft;

        if(
            this._elementBoundsService.isElementInBounds
                (
                    tabBarItem,
                    this.tabBarWrapper.nativeElement
                )
        )
        {
            tabBarItem.scrollIntoView
                (
                    {
                        behavior: 'smooth',
                        block: 'nearest',
                        inline: 'nearest'
                    }
                );
        }
    }

    ///
    /// Shows scroll buttons when tabs items overflows tab bar.
    ///
    public showHideScrollButtons(): void
    {
        if(
            this._elementBoundsService.isElementInBoundsLeft(
                this.tabItemsArray[0].nativeElement,
                this.tabBarWrapper.nativeElement
            ) &&
            this._elementBoundsService.isElementInBoundsRight(
                this.tabItemsArray[this.tabItemsArray.length - 1].nativeElement,
                this.tabBarWrapper.nativeElement
            )
        )
        {
            this.isLeftMask = false;
            this.isRightMask = false;

            this.isScrollLeftButtonVisible = true;
            this.isScrollRightButtonVisible = true;
            this.isLeftRightMask = true;
        }
        else
        {
            if(
                this._elementBoundsService.isElementInBoundsLeft(
                    this.tabItemsArray[0].nativeElement,
                    this.tabBarWrapper.nativeElement
                )
            )
            {
                this.isLeftRightMask = false;
                this.isScrollLeftButtonVisible = true;
                this.isRightMask = true;
            }
            else
            {
                this.isScrollLeftButtonVisible = false;
                this.isRightMask = false;
            }

            if(
                this._elementBoundsService.isElementInBoundsRight(
                    this.tabItemsArray[this.tabItemsArray.length - 1].nativeElement,
                    this.tabBarWrapper.nativeElement
                )
            )
            {
                this.isLeftRightMask = false;
                this.isScrollRightButtonVisible = true;
                this.isRightMask = true;
            }
            else
            {
                this.isScrollRightButtonVisible = false;
                this.isRightMask = false;
            }
        }
    }

    ///
    ///Scrolls tab bar to the left
    ///
    public onScrollTabBarLeft(): void
    {
        if(
            this._elementBoundsService.isElementInBounds
                (
                    this.tabBarItems.first.nativeElement,
                    this.tabBarWrapper.nativeElement
                )
        )
        {
            this.tabBarWrapper.nativeElement.scrollLeft -= 200;
            // this.showHideScrollButtons();
        }

    }

    ///
    ///Scrolls tab bar to the right
    ///
    public onScrollTabBarRight(): void
    {
        if(
            this._elementBoundsService.isElementInBounds
                (
                    this.tabBarItems.last.nativeElement,
                    this.tabBarWrapper.nativeElement
                )
        )
        {
            this.tabBarWrapper.nativeElement.scrollLeft += 200;
            // this.showHideScrollButtons();
        }
    }

    public onScroll(element: HTMLElement): void
    {
        if(element.offsetWidth + element.scrollLeft >= element.scrollWidth)
        {
            this.isLeftRightMask = false;

            this.isScrollRightButtonVisible = false;
            this.isRightMask = false;

            this.isScrollLeftButtonVisible = true;
            this.isLeftMask = true;
        }

        if(element.scrollLeft == 0)
        {
            this.isLeftRightMask = false;

            this.isScrollLeftButtonVisible = false;
            this.isRightMask = false;

            this.isScrollRightButtonVisible = true;
            this.isRightMask = true;
        }

        if(element.offsetWidth + element.scrollLeft < element.scrollWidth && element.scrollLeft != 0)
        {
            this.isLeftMask = false;
            this.isRightMask = false;

            this.isScrollLeftButtonVisible = true;
            this.isScrollRightButtonVisible = true;
            this.isLeftRightMask = true;
        }
    }

    ///
    ///Returns style that animates tab bar slider.
    ///
    public animateTabBarItemSlider(): Object
    {
        return {
            width: `${this.tabBarSliderWidth}px`,
            transform: `translate(${this.tabBarItemSliderOffsetLeft}px)`
        }
    }

    ///
    ///Set tab height on tab change
    ///
    public setTabContentWrapperHeight(event: any, tabContentWrapper: HTMLElement, tabContent: HTMLElement): void
    {
        // tabContent.style.width = `${parseInt(getComputedStyle(tabContent).getPropertyValue('width').split('px').filter(x => x)[0]) - parseInt(getComputedStyle(tabContentWrapper).getPropertyValue('padding').split('px').filter(x => x)[0])}px`
        // tabContentWrapper.style.maxHeight = `${event + 2 * parseInt(getComputedStyle(tabContentWrapper).getPropertyValue('padding').split('px').filter(x => x)[0])}px`;
        // tabContentWrapper.style.minHeight = `${event + 2 * parseInt(getComputedStyle(tabContentWrapper).getPropertyValue('padding').split('px').filter(x => x)[0])}px`;
    }
}
