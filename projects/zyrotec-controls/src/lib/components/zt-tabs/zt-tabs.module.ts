import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZtTabGroupComponent } from './zt-tab-group.component';
import { ZtTabComponent } from './zt-tab/zt-tab.component';
import { PortalModule } from '@angular/cdk/portal';
import { ZtTabContentDirective } from './zt-tab-content.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
    declarations: [
        ZtTabGroupComponent,
        ZtTabComponent,
        ZtTabContentDirective
    ],
    imports: [
        CommonModule,
        PortalModule,
        BrowserAnimationsModule
    ],
    exports: [
        ZtTabGroupComponent,
        ZtTabComponent,
    ]
})
export class ZtTabsModule { }
