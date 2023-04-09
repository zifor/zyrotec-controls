import { ChangeDetectionStrategy } from '@angular/compiler';
import { Component, ElementRef, Input, OnInit, TemplateRef, ViewChild, AfterViewInit, ViewContainerRef, EmbeddedViewRef, AfterViewChecked } from '@angular/core';

@Component({
    selector: 'zt-tab',
    templateUrl: './zt-tab.component.html',
    styleUrls: ['./zt-tab.component.scss']
})
export class ZtTabComponent implements OnInit
{
    @ViewChild('content', { read: TemplateRef, static: true })
    public content!: TemplateRef<any>

    @Input()
    public label: string = '';

    @Input()
    public icon: string = '';

    public isActive: boolean = false;

    public ngOnInit(): void
    {

    }
}
