import { Directive, ElementRef, HostListener, Renderer2, Input } from '@angular/core';
import { isNullOrUndefined } from 'util';

@Directive({
    // tslint:disable-next-line: directive-selector
    selector: '[apDarkenOnHover]'
})
export class DarkenOnHoverDirective{

    @Input() brightness = '70%';

    constructor(private el: ElementRef, private render: Renderer2) {

    }

    @HostListener('mouseover') darkenOn(): void {
        this.render.setStyle(this.el.nativeElement, 'filter', `brightness(${this.brightness})`);
    }

    @HostListener('mouseleave') darkenOff(): void {
        this.render.setStyle(this.el.nativeElement, 'filter', 'brightness(100%)');
    }
}
