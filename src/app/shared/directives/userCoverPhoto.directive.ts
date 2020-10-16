import {Directive, ElementRef, OnDestroy, OnInit} from '@angular/core';
import {UserServices} from '@core/services';
import {BlogUser} from '@shared/interfaces';
import {Subscription} from 'rxjs';

@Directive({
  selector: '[appBgControl]'
})
/*
  This directive used for setting user cover photo
  if this photo uploaded and photo placeholder if not
 */
export class UserCoverPhotoDirective implements OnInit, OnDestroy {

  currentSub: Subscription;

  constructor(
    private el: ElementRef,
    private userServices: UserServices
  ) {
  }

  ngOnInit(): void {
    this.currentSub = this.userServices.currentUser$.subscribe((data: BlogUser) => {
      this.el.nativeElement.style.background =
        data.bgPhotoUrl
          ? 'url(' + data.bgPhotoUrl + ') center / cover no-repeat'
          : 'url(assets/images/bgPlaceHolder.png) center / cover no-repeat';
    });
  }

  ngOnDestroy(): void {
    if (this.currentSub) {
      this.currentSub.unsubscribe();
    }
  }
}
