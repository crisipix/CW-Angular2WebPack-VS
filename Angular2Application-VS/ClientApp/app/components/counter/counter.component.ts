import { Component } from '@angular/core';

@Component({
    selector: 'counter',
    template: require('./counter.component.html')
})
export class CounterComponent {
    public currentCount = 12;

    public incrementCounter() {
        this.currentCount++;
    }
}
