import { Directive, OnInit, Input, Output, EventEmitter, ElementRef, AfterViewInit } from '@angular/core';

@Directive({
    selector: '[ztTabContent]'
})
export class ZtTabContentDirective implements AfterViewInit
{
    @Output()
    changeTabContentWrapperHeight: EventEmitter<number> = new EventEmitter<number>();

    constructor(private element: ElementRef<HTMLElement>) { }

    ngAfterViewInit()
    {
        this.setTabContentWrapperHeight();
    }

    public setTabContentWrapperHeight(): void
    {
        this.changeTabContentWrapperHeight.emit(this.element.nativeElement.offsetHeight);
    }

}
