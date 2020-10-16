import {Component, OnDestroy, OnInit} from '@angular/core';
import {BlogUser, Post, Subs} from '@shared/interfaces';
import {Subscription} from 'rxjs';
import {UserServices} from '@core/services';
import {MatDialog} from '@angular/material/dialog';
import {AddEditPostModalComponent} from '@shared/components';

@Component({
  selector: 'app-my-page',
  templateUrl: './my-page.component.html',
  styleUrls: ['./my-page.component.scss']
})
export class MyPageComponent implements OnInit, OnDestroy {

  current: BlogUser;
  posts: Post[];
  mySub: BlogUser[];

  currentSub: Subscription;
  postsSub: Subscription;

  constructor(
    private userServices: UserServices,
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.currentSub = this.userServices.currentUser$.subscribe((data: BlogUser) => this.current = data);

    this.postsSub = this.userServices.myPosts$.subscribe((posts: Post[]) => this.posts = posts);

    this.userServices.userSubscriptions$.subscribe((subs: Subs[]) => {
      this.userServices.getAllUsers().subscribe((users: BlogUser[]) => {
        this.mySub = subs ? users.filter(user => subs.some(element => user.localId === element.subscription)) : null;
      });
    });
  }

  openAddNew() {
    this.dialog.open(AddEditPostModalComponent, {
      width: '700px',
      minHeight: '300px'
    });
  }

  ngOnDestroy(): void {
    if (this.currentSub) {
      this.currentSub.unsubscribe();
    }

    if (this.postsSub) {
      this.postsSub.unsubscribe();
    }
  }

}
