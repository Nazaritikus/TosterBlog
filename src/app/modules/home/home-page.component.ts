import {Component, OnInit} from '@angular/core';
import {BlogUser, Post, Subs} from '@shared/interfaces';
import {UserServices} from '@core/services';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  current: BlogUser;
  mySubs: BlogUser[];
  subscrPosts: Post[] = [];

  currentSub: Subscription;
  subSub: Subscription;

  constructor(
    private userServices: UserServices
  ) {
  }

  ngOnInit(): void {
    this.currentSub = this.userServices.currentUser$.subscribe((user: BlogUser) => this.current = user);

    this.subSub =
      this.userServices.userSubscriptions$.subscribe(
        (subs: Subs[]) => this.userServices.getAllUsers().subscribe(
          (users: BlogUser[]) => {
            this.mySubs = subs
              ? users.filter(user => subs.some(element => user.localId === element.subscription))
              : null;

            this.mySubs
              ? this.mySubs.forEach(
              (user: BlogUser) => this.userServices.getUserPosts(user.localId, false).subscribe(
                (post: Post[]) => this.subscrPosts.push(...post)))
              : null;
          })
      );
  }

}
