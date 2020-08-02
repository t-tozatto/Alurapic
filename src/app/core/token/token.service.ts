import { Injectable } from '@angular/core';

const KEY = 'authToken';

@Injectable({
    providedIn: 'root'
  })
export class TokenService {

    hasToken(): boolean {
        return !!this.getToken();
    }

    setToken(authToken: string): void {
        window.localStorage.setItem(KEY, authToken);
    }

    getToken(): string {
        return window.localStorage.getItem(KEY);
    }

    removeToken(): void{
        window.localStorage.removeItem(KEY);
    }
}
