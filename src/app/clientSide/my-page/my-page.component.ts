import {Component, OnDestroy, OnInit} from '@angular/core';
import {BlogUser, Post} from '../../shared/interfaces';
import {Subscription} from 'rxjs';
import {UserServices} from '../../shared/services/user.services';
import {MatDialog} from '@angular/material/dialog';
import {AddNewPostPageComponent} from '../add-new-post-page/add-new-post-page.component';

@Component({
  selector: 'app-my-page',
  templateUrl: './my-page.component.html',
  styleUrls: ['./my-page.component.scss']
})
export class MyPageComponent implements OnInit, OnDestroy {

  current: BlogUser
  posts: Post[]

  currentSub: Subscription
  postsSub: Subscription

  constructor(
    private userServices: UserServices,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.currentSub = this.userServices.currentUser$.subscribe((data: BlogUser) => {
      this.current = data
    })

    this.postsSub = this.userServices.myPosts$.subscribe((posts: Post[]) => {
      this.posts = posts
    })
  }

  openAddNew() {
    this.dialog.open(AddNewPostPageComponent, {
      width: '700px',
      minHeight: '300px'
    })
  }

  ngOnDestroy(): void {
    if(this.currentSub){
      this.currentSub.unsubscribe()
    }

    if(this.postsSub){
      this.postsSub.unsubscribe()
    }
  }

}
