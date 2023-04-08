import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZtTabGroupComponent } from './zt-tab-group.component';
import { ZtTabComponent } from './zt-tab/zt-tab.component';



@NgModule({
  declarations: [
    ZtTabGroupComponent,
    ZtTabComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ZtTabGroupComponent,
    ZtTabComponent
  ]
})
export class ZtTabsModule { }
