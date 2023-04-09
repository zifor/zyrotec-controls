import { Component } from '@angular/core';

@Component({
    selector: 'zt-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent
{
    title = 'zyrotec-controls-testing';

    kwenter()
    {
        console.log('kwenter');

    }
}
