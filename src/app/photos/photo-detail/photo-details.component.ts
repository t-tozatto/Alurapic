import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PhotoService } from '../photo/photo.service';
import { Photo } from '../photo/photo';
import { Observable } from 'rxjs';
import { AlertService } from '../../shared/components/alert/alert.service';
import { UserService } from '../../core/user/user.service';

@Component({
    templateUrl: './photo-details.component.html'
})
export class PhotoDetailsComponent implements OnInit {

    photo$: Observable<Photo>;

    constructor(private route: ActivatedRoute,
                private photoService: PhotoService,
                private router: Router,
                private alertService: AlertService,
                private userService: UserService) {}

    ngOnInit(): void {
        this.photo$ = this.photoService.findById(this.route.snapshot.params.photoId);
        this.photo$.subscribe(() => {}, err => {
            this.router.navigate(['not-found']);
        });
    }

    remove(photoId: number): void {
        this.photoService
            .removePhoto(photoId)
            .subscribe(
                () => {
                    this.alertService.success('Photo removed', true);
                    this.router.navigate(['/user', this.userService.getUserName()]);
                },
                err => {
                    this.alertService.warning('Could not delete the photo!');
                });
    }

    like(photo: Photo): void {
        this.photoService.like(photo.id)
        .subscribe(liked => {
            if (liked) {
                this.photo$ = this.photoService.findById(photo.id);
            }
        });
    }
}
