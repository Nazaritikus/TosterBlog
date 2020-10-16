import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';

import {Subscription} from 'rxjs';

import {BlogUser} from '@shared/interfaces';
import {UserServices} from '@core/services';


@Component({
  selector: 'app-small-user-section',
  templateUrl: './small-user-section.component.html',
  styleUrls: ['./small-user-section.component.scss']
})
export class SmallUserSectionComponent implements OnInit, OnDestroy {

  @Input() user: BlogUser;
  @Input() subscribed = true;
  @Output() subscribe: EventEmitter<string> = new EventEmitter<string>();
  @Output() unsubscribe: EventEmitter<string> = new EventEmitter<string>();

  current: BlogUser;
  currentSub: Subscription;

  constructor(
    private userServices: UserServices
  ) {
  }

  ngOnInit(): void {
    this.currentSub = this.userServices.currentUser$.subscribe((data: BlogUser) => this.current = data);
  }

  subscribeTo(subToId: string) {
    this.subscribe.emit(subToId);
  }

  unsubscribeFrom(unsubFrom: string) {
    this.unsubscribe.emit(unsubFrom);
  }

  ngOnDestroy(): void {
    if (this.currentSub) {
      this.currentSub.unsubscribe();
    }
  }
}
