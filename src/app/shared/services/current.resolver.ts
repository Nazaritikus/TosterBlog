import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {fBUser} from '../interfaces';
import {UserServices} from './user.services';

@Injectable({providedIn: 'root'})
export class CurrentResolver implements Resolve<fBUser>{

  constructor(private userServices: UserServices) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<fBUser> | Promise<fBUser> | fBUser {
    return this.userServices.getCurrent(localStorage.getItem('fb-user'));
  }

}
