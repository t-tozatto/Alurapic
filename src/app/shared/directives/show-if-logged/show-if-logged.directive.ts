import { Directive, ElementRef, Renderer2, OnInit } from '@angular/core';
import { UserService } from '../../../core/user/user.service';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[showIfLogged]',
})
export class ShowIfLoggedDirective implements OnInit {

  constructor(
    private element: ElementRef<any>,
    private renderer: Renderer2,
    private userService: UserService
  ) {}

  ngOnInit(): void {
        if (!this.userService.isLogged()){
            this.renderer.setStyle(this.element.nativeElement, 'display', 'none');
        }
  }
}
