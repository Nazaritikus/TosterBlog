import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserPageComponent} from './user-page.component';
import {SharedModule} from '@shared/shared.module';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [UserPageComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([{path: '', component: UserPageComponent}])
  ]
})
export class UserPageModule { }
