import { Component, ContentChildren, QueryList, OnInit, AfterContentInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { ZtTabComponent } from './zt-tab/zt-tab.component';

@Component({
    selector: 'zt-tab-group',
    templateUrl: './zt-tab-group.component.html',
    styleUrls: ['./zt-tab-group.component.scss']
})
export class ZtTabGroupComponent implements OnInit, AfterContentInit, AfterViewInit
{
    @ContentChildren(ZtTabComponent)
    public tabs!: QueryList<ZtTabComponent>

    @ViewChild('content', { read: ElementRef<HTMLElement>, static: false })
    public content!: ElementRef<HTMLElement>

    public ngOnInit(): void
    {
        console.log(this.content);
    }

    public ngAfterViewInit(): void
    {

    }

    public ngAfterContentInit(): void
    {
        let activeTabs = this.tabs.filter(
            (tab) =>
            {
                return tab.isActive == true;
            }
        );

        if(activeTabs.length == 0)
        {
            this.tabs.first.isActive = true;
        }
    }

    public onSelectTab(tab: ZtTabComponent, index: number)
    {
        let tabsArray = this.tabs.toArray();

        for(let i = 0; i < tabsArray.length; i++)
        {
            tabsArray[i].isActive = false;
        }

        tab.isActive = true;
    }
}
