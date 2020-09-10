import {Directive, ElementRef, Input, OnDestroy, OnInit} from '@angular/core';
import {UserServices} from '../../shared/services/user.services';
import {BlogUser} from '../../shared/interfaces';
import {Subscription} from 'rxjs';

@Directive({
  selector: '[appBgControl]'
})
export class BgControlDirective implements OnInit, OnDestroy{

  currentSub: Subscription

  constructor(
    private el: ElementRef,
    private userServices: UserServices
    ) { }

  ngOnInit(): void {
    this.currentSub = this.userServices.currentUser$.subscribe((data: BlogUser) => {
      this.el.nativeElement.style.background =
        data.bgPhotoUrl
        ? 'url(' + data.bgPhotoUrl + ') center / cover no-repeat'
        : 'url(assets/welcome/bgPlaceHolder.png) center / cover no-repeat'
    })
  }

  ngOnDestroy(): void {
    if(this.currentSub){
      this.currentSub.unsubscribe()
    }
  }
}
