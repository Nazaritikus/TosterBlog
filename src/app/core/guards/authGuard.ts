import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthServices} from '@core/services';
import {MatDialog} from '@angular/material/dialog';
import {DialogMessagesComponent} from '@shared/components';
import {CUSTOM_MESSAGES} from '@shared/constants';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate{

  constructor(
    private authService: AuthServices,
    private router: Router,
    private dialog: MatDialog
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if(this.authService.isAuthenticated()){
      return true;
    } else {
      this.router.navigate(['/'])
      this.dialog.open(DialogMessagesComponent, {
        data: {
          message: CUSTOM_MESSAGES.notAuthorized,
          title: 'Attention!'
        }
      });
    }
  }

}
