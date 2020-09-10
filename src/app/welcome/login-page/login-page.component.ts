import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';

import {LoginData} from '../../shared/interfaces';
import {AuthServices} from '../../shared/services/auth.services';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit, OnDestroy {

  form: FormGroup
  hide: boolean = true
  submitted: boolean = false
  userData: LoginData
  loginSub: Subscription

  constructor(
      private auth: AuthServices,
      private router: Router
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }

  submit() {
    if(this.form.invalid){
      return
    }

    this.submitted = true
    this.userData = this.form.value

    this.loginSub = this.auth.login(this.userData).subscribe(() => {
      this.form.reset()
      this.submitted = false
      this.router.navigate(['/client/myPage'])
    }, () => {
      this.submitted = false
    })
  }

  ngOnDestroy(): void {
    if(this.loginSub){
      this.loginSub.unsubscribe()
    }
  }
}
