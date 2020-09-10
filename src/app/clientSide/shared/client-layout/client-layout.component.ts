import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthServices} from '../../../shared/services/auth.services';
import {ActivatedRoute, Router} from '@angular/router';
import {UserServices} from '../../../shared/services/user.services';
import {BlogUser, fBUser} from '../../../shared/interfaces';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-client-layout',
  templateUrl: './client-layout.component.html',
  styleUrls: ['./client-layout.component.scss']
})
export class ClientLayoutComponent implements OnInit, OnDestroy {

  current: BlogUser
  currentSub: Subscription

  constructor(
    private auth: AuthServices,
    private userServices: UserServices,
    private activateRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.currentSub = this.userServices.currentUser$.subscribe((data: BlogUser) => {
      this.current = data
    })
  }

  logout(){
    this.auth.logOut()
    this.router.navigate(['/'])
  }

  ngOnDestroy(): void {
    this.currentSub.unsubscribe()
  }
}
