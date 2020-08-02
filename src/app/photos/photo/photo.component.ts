import { Component, Input } from '@angular/core';

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'ap-photo',
    templateUrl: './photo.component.html'
})

export class PhotoComponent {
    @Input() description: string;
    @Input() url: string;
}
