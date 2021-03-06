import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Photo } from './photo';
import { Observable, of, throwError } from 'rxjs';
import { PhotoComment } from './photo-comment';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

const API = environment.ApiUrl;

@Injectable({ providedIn: 'root' })
export class PhotoService {

    constructor(private http: HttpClient) {}

    listFromUser(userName: string): Observable<object> {
        return this.http
            .get<Photo[]>(API + '/' + userName + '/photos');
    }

    listFromUserPaginated(userName: string, page: number): Observable<object> {
        const params = new HttpParams()
            .append('page', page.toString());

        return this.http
            .get<Photo[]>(API + '/' + userName + '/photos', { params });
    }

    upload(description: string, allowComments: boolean, file: File): Observable<object> {

        const formData = new FormData();
        formData.append('description', description);
        formData.append('allowComments', allowComments ? 'true' : 'false');
        formData.append('imageFile', file);

        return this.http.post(API + '/photos/upload', formData);

    }

    findById(photoId: number): Observable<Photo> {
        return this.http.get<Photo>(API + '/photos/' + photoId);
    }

    getComments(photoId: number): Observable<PhotoComment[]>  {
        return this.http.get<PhotoComment[]>(API + '/photos/' + photoId + '/comments');
    }

    addComment(photoId: number, commentText: string): Observable<object> {
        return this.http.post(API + '/photos/' + photoId + '/comments', {
            commentText
        });
    }

    removePhoto(photoId: number): Observable<object> {
        return this.http.delete(API + '/photos/' + photoId);
    }

    indById(id: string): Observable<Photo> {
        return this.http.get<Photo>(API + '/photos/' + id);
    }

    like(photoId: number): Observable<boolean> {
        return this.http.post(API + '/photos/' + photoId +  '/like', {}, {observe: 'response'})
        .pipe(map((res) => true))
        .pipe(catchError(err => {
            if (err.status === '304'){
                return of(false);
            }
            else{
                throwError(err);
            }
        }));
    }
}
