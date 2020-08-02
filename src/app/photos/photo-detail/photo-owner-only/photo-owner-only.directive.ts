import { Directive, ElementRef, Renderer2, OnInit } from '@angular/core';
import { Photo } from '../../photo/photo';
import { Input } from '@angular/core';
import { UserService } from '../../../core/user/user.service';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[photoOwnerOnly]',
})
export class PhotoOwnerOnlyDirective implements OnInit {
  @Input() ownedPhoto: Photo;

  constructor(
    private element: ElementRef<any>,
    private renderer: Renderer2,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.getUser().subscribe((user) => {
      if (!user || user.id !== this.ownedPhoto.userId) {
        this.renderer.setStyle(this.element.nativeElement, 'display', 'none');
      }
    });
  }
}
