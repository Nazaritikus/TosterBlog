import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {BlogUser, Subs} from '../../shared/interfaces';
import {UserServices} from '../../shared/services/user.services';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-small-user-section',
  templateUrl: './small-user-section.component.html',
  styleUrls: ['./small-user-section.component.scss']
})
export class SmallUserSectionComponent implements OnInit, OnDestroy {

  @Input() user: BlogUser
  @Input() subscribed: boolean = true
  @Output() onSubscribe: EventEmitter<string> = new EventEmitter<string>()
  @Output() onUnsubscribe: EventEmitter<string> = new EventEmitter<string>()

  current: BlogUser
  currentSub: Subscription

  constructor(
    private userServices: UserServices
  ) { }

  ngOnInit(): void {
    this.currentSub = this.userServices.currentUser$.subscribe((data: BlogUser) => this.current = data)
  }

  subscribe(subToId: string) {
    this.onSubscribe.emit(subToId)
  }

  unsubscribe(unsubFrom: string) {
    this.onUnsubscribe.emit(unsubFrom)
  }

  ngOnDestroy(): void {
    if(this.currentSub){
      this.currentSub.unsubscribe()
    }
  }
}
