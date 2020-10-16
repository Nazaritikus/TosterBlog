import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {fBUser} from '@shared/interfaces';
import {UserServices} from '@core/services';
import {STORAGE_ITEMS} from '@shared/constants';

@Injectable({providedIn: 'root'})
export class CurrentUserResolver implements Resolve<fBUser> {

  constructor(private userServices: UserServices) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<fBUser> | Promise<fBUser> | fBUser {
    return this.userServices.getCurrent(localStorage.getItem(STORAGE_ITEMS.user));
  }

}
