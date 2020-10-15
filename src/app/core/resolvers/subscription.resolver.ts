import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {UserServices} from '@core/services';
import {Observable} from 'rxjs';
import {Subs} from '@shared/interfaces';

@Injectable({providedIn: 'root'})
export class SubscriptionResolver implements Resolve<Subs[]>{

  constructor(private userServices: UserServices) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Subs[]> | Promise<Subs[]> | Subs[] {
    return this.userServices.getSubscriptions(localStorage.getItem('fb-user'));
  }
}
