import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../../shared/shared.module';
import {RouterModule} from '@angular/router';
import {ProfilePageComponent} from './profile-page.component';

@NgModule({
  declarations: [ProfilePageComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([{path: '', component: ProfilePageComponent}])
  ],
  exports: [RouterModule]
})
export class ProfilePageModule { }
