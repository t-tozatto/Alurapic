import { Component, Input } from "@angular/core";

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'ap-card',
    templateUrl: './card.component.html'
})
export class CardComponent{
    @Input() title = '';
}