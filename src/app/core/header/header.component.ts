import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from '../user/user';
import { UserService } from '../user/user.service';
import { Router } from '@angular/router';

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'ap-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent {

    user$: Observable<User>;

    constructor(private userService: UserService, private router: Router) {
        this.user$ = userService.getUser();
    }

    logout(): void {
        this.userService.logout();
        this.router.navigate(['']);
    }
}
