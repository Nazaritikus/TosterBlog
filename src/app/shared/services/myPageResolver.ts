import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Post} from '../interfaces';
import {UserServices} from './user.services';
import {Observable} from 'rxjs';

@Injectable({ providedIn: 'root'})
export class MyPageResolver implements Resolve<Post[]>{

  constructor(
    private user: UserServices
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Post[]> | Promise<Post[]> | Post[] {
    return this.user.getUserPosts(localStorage.getItem('fb-user'));
  }

}
