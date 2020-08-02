import { Component, OnInit, Input } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { PhotoComment } from '../../photo/photo-comment';
import { PhotoService } from '../../photo/photo.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { switchMap, tap } from 'rxjs/operators';

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'ap-photo-comments',
    templateUrl: './photo-comments.component.html',
    styleUrls: ['./photo-comments.css']
})
export class PhotoCommentsComponent implements OnInit {

    @Input() photoId: number;
    photoComment$: Observable<PhotoComment[]>;
    commentForm: FormGroup;

    constructor(private photoService: PhotoService, private formBuilder: FormBuilder) {}

    ngOnInit(): void {

        this.photoComment$ = this.photoService.getComments(this.photoId);
        this.commentForm = this.formBuilder.group({
            comment: ['', Validators.maxLength(300)]
        });
    }

    save(): void {
        this.photoComment$ = this.photoService.addComment(this.photoId, this.commentForm.get('comment').value)
        .pipe(switchMap(() => this.photoService.getComments(this.photoId)))
        .pipe(tap(() => {
            this.commentForm.reset();
        }));
    }
}
