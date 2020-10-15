import {Component, OnDestroy, OnInit} from '@angular/core';

import {Subscription} from 'rxjs';

import {UserServices} from '@core/services';
import {BlogUser, Subs} from '@shared/interfaces';

@Component({
  selector: 'app-subscription-manager-page',
  templateUrl: './subscription-manager-page.component.html',
  styleUrls: ['./subscription-manager-page.component.scss']
})
export class SubscriptionManagerPageComponent implements OnInit, OnDestroy {

  users: BlogUser[]
  mySubscriptions: BlogUser[]
  current: BlogUser
  subscriptions: Subs[] = []
  localId: string

  allUsersSub: Subscription
  currentSub: Subscription
  subSub: Subscription

  constructor(
    private userS: UserServices
  ) { }

   ngOnInit(): void {
    this.localId  = localStorage.getItem('fb-user')

    this.currentSub = this.userS.currentUser$.subscribe(curr => this.current = curr)

    this.allUsersSub = this.userS.getAllUsers().subscribe(resp => {
      this.users = resp.filter(user => user.fbId !== this.current.fbId)

      this.subSub = this.userS.userSubscriptions$.subscribe((data: Subs[]) => {
        this.subscriptions = data
        this.mySubscriptions = data ? this.users.filter(user => data.some(element => user.localId === element.subscription)) : null
      })
    })
  }

  subscribe(subscrId: string) {
    this.userS.createSubscription(subscrId, this.localId).subscribe()
  }

  unsubscribe(unsubId: string) {
    this.userS.removeSubscription(
      this.subscriptions.find(value => value.subscription === unsubId).fbId,
      this.localId
    ).subscribe()
  }

  isSubscribed(user: BlogUser): boolean{
    return this.subscriptions ? this.subscriptions.some(subs => subs.subscription === user.localId) : null
  }

  ngOnDestroy(): void {
    if(this.allUsersSub) { this.allUsersSub.unsubscribe()}
    if(this.currentSub) { this.currentSub.unsubscribe()}
    if(this.subSub) { this.subSub.unsubscribe()}
  }
}
