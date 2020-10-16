import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '@shared/shared.module';
import {MyPageComponent} from './my-page.component';
import {RandomNumberGeneratorComponent} from './components/randomNumberGenerator/randomNumberGenerator.component';
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [
    MyPageComponent,
    RandomNumberGeneratorComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([{path: '', component: MyPageComponent}])
  ],
  exports: [RouterModule]
})
export class MyPageModule { }
