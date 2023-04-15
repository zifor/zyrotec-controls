import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ZtTabsModule } from 'zyrotec-controls';
import { ZtSelectModule } from 'zyrotec-controls';

import { AppComponent } from './app.component';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        ZtTabsModule,
        ZtSelectModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
