import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZtSelectComponent } from './zt-select.component';
import { ZtSelectOptionComponent } from './zt-select-option/zt-select-option.component';



@NgModule({
    declarations: [
        ZtSelectComponent,
        ZtSelectOptionComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        ZtSelectComponent,
        ZtSelectOptionComponent
    ]
})
export class ZtSelectModule { }
