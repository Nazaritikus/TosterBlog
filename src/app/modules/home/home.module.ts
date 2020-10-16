import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomePageComponent} from './home-page.component';
import {SharedModule} from '@shared/shared.module';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [HomePageComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([{path: '', component: HomePageComponent}])
  ],
  exports: [RouterModule]
})
export class HomeModule { }
