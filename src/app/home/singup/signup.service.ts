import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NewUser } from './new-user';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

const API = environment.ApiUrl;

@Injectable()
export class SignUpService {

    constructor(private http: HttpClient) {}

    checkUserNameTaken(userName: string): Observable<object> {
        return this.http.get(API + '/user/exists/' + userName);
    }

    signup(newUser: NewUser): Observable<object> {
        return this.http.post(API + '/user/signup', newUser);
    }
}
