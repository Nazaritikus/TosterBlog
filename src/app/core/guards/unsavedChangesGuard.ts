import {Injectable} from '@angular/core';
import {CanDeactivate} from '@angular/router';
import {Observable} from 'rxjs';
import {ComponentCanDeactivate} from '@shared/interfaces';
import {MatDialog} from '@angular/material/dialog';
import {UserServices} from '@core/services';
import {UnsavedEditModalComponent} from '@shared/components';

@Injectable({providedIn: 'root'})
export class UnsavedChangesGuard implements CanDeactivate<ComponentCanDeactivate> {

  constructor(
    private dialog: MatDialog,
    private userService: UserServices
  ) {
  }

  canDeactivate(component: ComponentCanDeactivate): Observable<boolean> | boolean {
    if (component.canDeactivate()) {
      this.dialog.open(UnsavedEditModalComponent);
      return this.userService.navigateAwaySelection$;
    } else {
      return true;
    }
  }

}
