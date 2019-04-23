import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HseHttpClient } from './hse-httpclient';
import { HseHttpParams } from './hse-httpparams';
import { User, AuthInfo, AuthArgs } from '../models/user.models';

@Injectable()
export class AuthService {

    private cookieName: string = "__AUTH_COOKIE";
    private localStorageName: string = "__auth";
    private apiBase: string = '/api/user/';

    constructor(private client: HseHttpClient) { }

    get isAdmin(): boolean {
        var user = this.user;
        if (!user)
            return false;
        
        return user.isAdmin;
    }

    get isAuth(): boolean {
        if (!this.user)
            return false;

        return true;
    }

    get userLogin(): string {
        var user = this.user;
        if (!user)
            return null;

        return user.login;
    }

    login(args: AuthArgs): Observable<AuthInfo> {
        return new Observable(observer => {
            this.client
                .post<AuthInfo>(this.apiBase + 'login', args)
                .subscribe(authInfo => {
                    if (!authInfo)
                        observer.error(null);
                        this.setUser(authInfo);
                        observer.next(null);
                    },
                    (error) => {
                        observer.error(error);
                    },
                    () => {
                        observer.complete();
                    }
                );
        });
    }
    
    logout() {
        document.cookie = `${this.cookieName}=; path=/; expires=${new Date().toUTCString()}`;
        localStorage.setItem(this.localStorageName, null);
    }

    private get user(): User {
        return JSON.parse(localStorage.getItem(this.localStorageName));
    }

    private setUser(authInfo: AuthInfo) {
        var date = new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 30); //30 дней
        document.cookie = `${this.cookieName}=${authInfo.token}; path=/; expires=${date.toUTCString()}`;
        localStorage.setItem(this.localStorageName, JSON.stringify(authInfo.user));
    }
}