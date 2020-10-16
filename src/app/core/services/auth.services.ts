import {Injectable} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

import {Observable, throwError} from 'rxjs';
import {catchError, switchMap, tap} from 'rxjs/operators';

import {ERROR_MAP, STORAGE_ITEMS} from '@shared/constants';
import {BlogUser, LoginData, LoginResp} from '@shared/interfaces';
import {environment} from '../../../environments/environment.prod';
import {DialogMessagesComponent} from '@shared/components/dialog-messages/dialog-messages.component';

@Injectable({providedIn: 'root'})
export class AuthServices {

  constructor(
    private httpClient: HttpClient,
    public dialog: MatDialog
  ) {
  }

  get token(): string {
    const expDate = new Date(localStorage.getItem('fb-token-exp'));
    if (new Date() > expDate) {
      this.logOut();
      return null;
    }
    return localStorage.getItem('fb-token');
  }

  login(user: LoginData): Observable<LoginResp> {
    user.returnSecureToken = true;
    return this.httpClient.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
      .pipe(
        tap(this.setToken),
        catchError(this.handleError.bind(this))
      );
  }

  signUp(user: LoginData, blogUser: BlogUser): Observable<any> {
    user.returnSecureToken = true;
    return this.httpClient.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.apiKey}`, user)
      .pipe(
        tap(this.setToken),
        switchMap((response: LoginResp): Observable<BlogUser> => {
          return this.httpClient.post<BlogUser>(`${environment.databaseURL}/Users/${response.localId}.json`, blogUser);
        }),
        catchError(this.handleError.bind(this))
      );
  }

  logOut() {
    this.setToken(null);
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  private handleError(error: HttpErrorResponse) {
    const {message} = error?.error?.error;

    this.dialog.open(DialogMessagesComponent, {
      data: {
        message: ERROR_MAP.get(message),
        title: 'Attention!'
      }
    });

    return throwError(error);
  }

  private setToken(response: LoginResp | null) {
    if (response) {
      // get current date and summarize with expiresIn (revert to milliseconds)
      const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000);
      localStorage.setItem(STORAGE_ITEMS.token, response.idToken);
      localStorage.setItem(STORAGE_ITEMS.user, response.localId);
      localStorage.setItem(STORAGE_ITEMS.token_lifetime, expDate.toString());
    } else {
      localStorage.clear();
    }
  }
}
