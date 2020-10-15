import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

import {BlogUser, Country, LoginData} from '@shared/interfaces';
import {MatStepper} from '@angular/material/stepper';
import {AuthServices} from '@core/services';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {countries} from '@shared/constants';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
  }]
})
export class RegistrationPageComponent implements OnInit, OnDestroy {

  @ViewChild("confirmPass") confirmPass: ElementRef

  firstFormGroup: FormGroup
  secondFormGroup: FormGroup
  countries: Country[] = countries
  hideFirst = true
  hideConfirm = true
  match = true
  loading = false
  signUpSub: Subscription

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthServices,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.firstFormGroup = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      country: [''],
      city: [''],
      date: ['']
    });

    this.secondFormGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    })
  }

  checkPass(group: FormGroup, stepper: MatStepper){
    if(group.controls.password.value !== group.controls.confirmPassword.value){
      this.match = false
      this.confirmPass.nativeElement.focus()
    } else {
      this.match = true
      stepper.next()
    }
  }

  getErrorMessage(formField: string) {
    switch (Object.keys(this.secondFormGroup.get(formField).errors)[0]) {
      case 'required':
        return 'Please fill the filed'
      case 'email':
        return 'Please enter valid email address'
      case 'minlength':
        return 'Password should be at least 6 characters'
      default: return ''
    }
  }

  signUpNewUser() {
    if(this.firstFormGroup.invalid || this.secondFormGroup.invalid){
      return
    }
    this.loading = true

    const user: LoginData = {
      email: this.secondFormGroup.get('email').value,
      password: this.secondFormGroup.get('password').value
    }

    const userInfo: BlogUser = {
      ...this.firstFormGroup,
      name: this.firstFormGroup.get('firstName').value + ' ' + this.firstFormGroup.get('lastName').value,
      country: this.firstFormGroup.get('country').value,
      city: this.firstFormGroup.get('city').value,
      date: new Date(this.firstFormGroup.get('date').value),
      email: this.secondFormGroup.get('email').value
    }

    this.signUpSub = this.auth.signUp(user, userInfo).subscribe(() => {
      this.firstFormGroup.reset()
      this.secondFormGroup.reset()
      this.loading = false
      this.router.navigate(['/client/myPage'])
    }, () => {
      this.loading = false
    })
  }

  ngOnDestroy(): void {
    if(this.signUpSub){
      this.signUpSub.unsubscribe()
    }
  }
}
