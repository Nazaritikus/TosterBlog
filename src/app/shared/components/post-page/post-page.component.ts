import {Component, Input, OnInit} from '@angular/core';
import {UserServices} from '@core/services/user.services';

import {BlogUser, Post} from '../../interfaces';

import {MatDialog} from '@angular/material/dialog';
import {AddEditPostModalComponent} from '../../components/addEditPostModal/addEditPostModal.component';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {

  @Input() post: Post

  localId: string
  current: BlogUser

  constructor(
    private userServices: UserServices,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.localId = localStorage.getItem('fb-user')

    this.userServices.currentUser$.subscribe((data: BlogUser) => {this.current = data})
  }

  editPost(post: Post) {
    this.dialog.open(AddEditPostModalComponent, {
      width: '700px',
      minHeight: '300px',
      data: post
    })
  }

  deletePost(fbId: string) {
    this.userServices.removePost(fbId, this.localId).subscribe()
  }
}
