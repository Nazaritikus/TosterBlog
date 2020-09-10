import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatStepperModule} from '@angular/material/stepper';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';

import {WelcomePageComponent} from './welcome-page/welcome-page.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {SharedModule} from '../shared/shared.module';
import { ValidatorDirective } from './shared/validator.directive';
import { TransformDirectiveDirective } from './shared/transform-directive.directive';
import {RegistrationPageComponent} from './registration-page/registration-page.component';

const routes: Routes = [
  {path: '', component: WelcomePageComponent},
  {path: 'signUp', component: RegistrationPageComponent}
]

@NgModule({
  declarations: [
    WelcomePageComponent,
    LoginPageComponent,
    RegistrationPageComponent,
    TransformDirectiveDirective,
    ValidatorDirective
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatStepperModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    SharedModule
  ],
  exports: [RouterModule]
})
export class WelcomeModule {

}
