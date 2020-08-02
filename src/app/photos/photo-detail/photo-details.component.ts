import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PhotoService } from '../photo/photo.service';
import { Photo } from '../photo/photo';
import { Observable } from 'rxjs';

@Component({
    templateUrl: './photo-details.component.html'
})
export class PhotoDetailsComponent implements OnInit {

    photo$: Observable<Photo>;

    constructor(private route: ActivatedRoute,
                private photoService: PhotoService,
                private router: Router) {}

    ngOnInit(): void {
        this.photo$ = this.photoService.findById(this.route.snapshot.params.photoId);
    }

    remove(photoId: number): void {
        this.photoService
            .removePhoto(photoId)
            .subscribe(() => this.router.navigate(['']));
    }
}
