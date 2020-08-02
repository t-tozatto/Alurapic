import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../core/auth/auth.service';
import { Router } from '@angular/router';
import { PlatformDetectorService } from '../../core/platform-detector/platform-detector.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
    templateUrl: './signin.component.html'
})
export class SignInComponent implements OnInit {

    loginForm: FormGroup;
    @ViewChild('userNameInput') userNameInput: ElementRef<HTMLInputElement>;

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private platformDetectorService: PlatformDetectorService,
        private cdRef: ChangeDetectorRef) { }

    ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
            userName: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    // tslint:disable-next-line: use-lifecycle-interface
    ngAfterViewInit(): void {
        // tslint:disable-next-line: no-unused-expression
        this.platformDetectorService.isPlatformBrowser() &&
        this.userNameInput.nativeElement.focus();
        this.cdRef.detectChanges();
    }

    // tslint:disable-next-line: typedef
    login() {
        const userName = this.loginForm.get('userName').value;
        const password = this.loginForm.get('password').value;

        this.authService
            .authenticate(userName, password)
            .subscribe(
                () => this.router.navigate(['user', userName]),
                err => {
                    console.log(err);
                    this.loginForm.reset();
                    // tslint:disable-next-line: no-unused-expression
                    this.platformDetectorService.isPlatformBrowser() &&
                        this.userNameInput?.nativeElement.focus();
                    alert('Invalid user name or password');
                }
            );
    }
}
