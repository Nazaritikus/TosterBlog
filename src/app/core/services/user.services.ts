import {Injectable} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

import {catchError, map, tap} from 'rxjs/operators';
import {BehaviorSubject, Observable, Subject, throwError} from 'rxjs';

import {ERROR_MAP} from '@shared/constants';
import {BlogUser, Post, Subs} from '@shared/interfaces';
import {environment} from '../../../environments/environment.prod';
import {DialogMessagesComponent} from '@shared/components/dialog-messages/dialog-messages.component';


@Injectable({providedIn: 'root'})
export class UserServices {

  currentUser$: BehaviorSubject<BlogUser> = new BehaviorSubject<BlogUser>(null);
  myPosts$: BehaviorSubject<Post[]> = new BehaviorSubject<Post[]>(null);
  userSubscriptions$: BehaviorSubject<Subs[]> = new BehaviorSubject<Subs[]>(null);
  navigateAwaySelection$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private httpClient: HttpClient,
    private dialog: MatDialog) {
  }

  getCurrent(localID: string): Observable<any> {
    return this.httpClient.get<any>(`${environment.databaseURL}/Users/${localID}.json`)
      .pipe(
        map((response: { [key: string]: any }) => {
          return Object.keys(response).map(key => ({
            ...response[key],
            fbId: key,
          }))[0];
        }),
        tap(this.setCurrentUser.bind(this)),
        catchError(this.handleError.bind(this))
      );
  }

  getNumbers() {
    return this.httpClient.get('https://numbersapi.p.rapidapi.com/random/trivia?max=20&fragment=true&min=10&json=true', {
      headers: {
        'x-rapidapi-hos': 'numbersapi.p.rapidapi.com',
        'x-rapidapi-key': '8421c91f56mshd1975446618d031p1a3fa6jsn525b4085c177'
      }
    });
  }

  getUserPosts(localId: string, current: boolean = true): Observable<Post[]> {
    return this.httpClient.get<Post[]>(`${environment.databaseURL}/Posts/${localId}.json`)
      .pipe(
        map((response: any[]) => {
          return response ? Object.keys(response).map(key => ({
            ...response[key],
            fbId: key,
          })) : null;
        }),
        tap((data: Post[]) => {
          current ? this.setMyPosts(data) : '';
        }),
        catchError(this.handleError.bind(this))
      );
  }

  getAllUsers(): Observable<BlogUser[]> {
    return this.httpClient.get(`${environment.databaseURL}/Users.json`)
      .pipe(
        map((resp: any[]) => {
          return Object.keys(resp).map(localId => ({
            ...resp[localId][Object.keys(resp[localId]).toString()],
            fbId: Object.keys(resp[localId]).toString(),
            localId: localId
          }));
        }),
        catchError(this.handleError.bind(this))
      );
  }

  getSubscriptions(localId: string): Observable<Subs[]> {
    return this.httpClient.get<Subs[]>(`${environment.databaseURL}/Subscriptions/${localId}.json`)
      .pipe(
        map(response => {
          return response ? Object.keys(response).map(key => ({
            ...response[key],
            fbId: key,
          })) : null;
        }),
        tap(this.setSubscription.bind(this)),
        catchError(err => {
          return throwError(err);
        })
      );
  }

  setCurrentUser(data) {
    this.currentUser$.next(data);
  }

  setMyPosts(posts: Post[]) {
    this.myPosts$.next(posts);
  }

  setSubscription(subscriptions: Subs[]) {
    this.userSubscriptions$.next(subscriptions);
  }

  updateClientProfileData(userData, localId: string) {
    return this.httpClient.patch(`${environment.databaseURL}/Users/${localId}.json`, userData)
      .pipe(
        map((response: { [key: string]: any }) => {
          return Object.keys(response).map(key => ({
            ...response[key],
            fbId: key,
          }))[0];
        }),
        tap(this.setCurrentUser.bind(this)),
        catchError(this.handleError.bind(this))
      );
  }

  updateClientPost(post: Post, fbPostId: string, localId: string) {
    return this.httpClient.patch(`${environment.databaseURL}/Posts/${localId}/${fbPostId}.json`, post)
      .pipe(
        map((response: any[]) => {
          return response ? Object.keys(response).map(key => ({
            ...response[key],
            fbId: key,
          })) : null;
        }),
        tap(() => this.getUserPosts(localId).subscribe())
      );
  }

  createSubscription(subs: string, localId: string) {
    return this.httpClient.post<string>(`${environment.databaseURL}/Subscriptions/${localId}.json`, {subscription: subs})
      .pipe(
        map((response: any): Subs => ({
          subscription: subs,
          fbId: response.name
        })),
        tap(() => this.getSubscriptions(localId).subscribe()),
        catchError(this.handleError.bind(this))
      );
  }

  createNewPost(post: Post, localId: string) {
    return this.httpClient.post(`${environment.databaseURL}/Posts/${localId}.json`, post)
      .pipe(
        tap(() => this.getUserPosts(localId).subscribe()), // TODO ask is it okay& better solution is to append new post to the myPost Subject
        catchError(this.handleError.bind(this))
      );
  }

  removeSubscription(subsFbId: string, localId: string) {
    return this.httpClient.delete(`${environment.databaseURL}/Subscriptions/${localId}/${subsFbId}.json`)
      .pipe(
        tap(() => this.getSubscriptions(localId).subscribe()),
        catchError(this.handleError.bind(this))
      );
  }

  removePost(postFbId: string, localId: string) {
    return this.httpClient.delete(`${environment.databaseURL}/Posts/${localId}/${postFbId}.json`)
      .pipe(
        tap(() => this.getUserPosts(localId).subscribe()),
        catchError(this.handleError.bind(this))
      );
  }

  private handleError(error: HttpErrorResponse) {
    const message = error?.error?.error?.message;

    this.dialog.open(DialogMessagesComponent, {
      data: {
        message: ERROR_MAP.get(message),
        title: 'Attention!'
      }
    });

    return throwError(error);
  }

}
