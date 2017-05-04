
import { Component } from '@angular/core';
import { GlobalConfig } from './global.config';

@Component({
    selector: 'app',
    template: require('./app.component.html'),
    styles: [require('./app.component.css')],
    providers: [GlobalConfig]

})
export class AppComponent {
    constructor(config: GlobalConfig) {
        console.log(config.Environment);
        console.log(config.API_URL);
    }
}
