import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Post} from '@shared/interfaces';
import {UserServices} from '@core/services';
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
