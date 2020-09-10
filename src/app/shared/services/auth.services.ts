import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';

import {Observable, throwError} from 'rxjs';
import {catchError, switchMap, tap} from 'rxjs/operators';

import {LoginData, LoginResp, BlogUser} from '../interfaces';
import {environment} from '../../../environments/environment.prod';
import {DialogMessagesComponent} from '../dialog-messages/dialog-messages.component';

@Injectable({providedIn: 'root'})
export class AuthServices {

  constructor(
    private httpClient: HttpClient,
    public dialog: MatDialog
  ) {
  }

  get token(): string{
    const expDate = new Date(localStorage.getItem('fb-token-exp'))
    if (new Date() > expDate){
      this.logOut()
      return null
    }
    return localStorage.getItem('fb-token')
  }

  login(user: LoginData) : Observable<LoginResp>{
    user.returnSecureToken = true
    return this.httpClient.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
      .pipe(
        tap(this.setToken),
        catchError(this.handleError.bind(this))
      )
  }

  signUp(user: LoginData, blogUser: BlogUser): Observable<any>{
    user.returnSecureToken = true
    return this.httpClient.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.apiKey}`, user)
      .pipe(
        tap(this.setToken),
        switchMap((response: LoginResp): Observable<BlogUser> => {
          return this.httpClient.post<BlogUser>(`${environment.databaseURL}/Users/${response.localId}.json`, blogUser)
        }),
        catchError(this.handleError.bind(this))
      )
  }

  logOut(){
    this.setToken(null)
  }

  isAuthenticated() : boolean{
    return !!this.token
  }

  private handleError(error: HttpErrorResponse){
    const {message} = error.error.error

    switch (message) {
      case 'EMAIL_NOT_FOUND' :
        this.dialog.open(DialogMessagesComponent, {data: {message: 'There is no user record corresponding to this identifier.', title: 'Attention!'}})
        break;
      case 'INVALID_PASSWORD' :
        this.dialog.open(DialogMessagesComponent, {data: {message: 'The password is invalid or the user does not have a password.', title: 'Attention!'}})
        break;
      case 'USER_DISABLED' :
        this.dialog.open(DialogMessagesComponent, {data: {message: 'The user account has been disabled by an administrator.', title: 'Attention!'}})
        break;
      case 'EMAIL_EXISTS' :
        this.dialog.open(DialogMessagesComponent, {data: {message: 'The email address is already in use by another account.', title: 'Attention!'}})
        break;
      case 'OPERATION_NOT_ALLOWED' :
        this.dialog.open(DialogMessagesComponent, {data: {message: 'Password sign-in is disabled for this project. Please contact administrator.', title: 'Attention!'}})
        break;
    }

    return throwError(error)
  }

  private setToken(response: LoginResp| null) {
    if(response){
      // get current date and summarize with expiresIn (revert to milliseconds)
      const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000)
      localStorage.setItem('fb-token', response.idToken)
      localStorage.setItem('fb-user', response.localId)
      localStorage.setItem('fb-token-exp', expDate.toString())
    } else {
      localStorage.clear()
    }
  }
}
