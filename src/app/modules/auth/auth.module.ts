import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

import {LoginPageComponent, RegistrationPageComponent, WelcomePageComponent} from './pages';
import {SharedModule} from '@shared/shared.module';

const routes: Routes = [
  {path: '', component: WelcomePageComponent},
  {path: 'signUp', component: RegistrationPageComponent}
];

@NgModule({
  declarations: [
    WelcomePageComponent,
    LoginPageComponent,
    RegistrationPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  exports: [RouterModule]
})
export class AuthModule {

}
