import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserServices} from '../../shared/services/user.services';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {BlogUser, Post} from '../../shared/interfaces';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-add-new-post-page',
  templateUrl: './add-new-post-page.component.html',
  styleUrls: ['./add-new-post-page.component.scss']
})
export class AddNewPostPageComponent implements OnInit, OnDestroy {

  addNew: FormGroup
  current: BlogUser
  localId: string
  loading: boolean = false

  currentSub: Subscription
  createNewSub: Subscription

  constructor(
    @Inject(MAT_DIALOG_DATA) public postData: Post,
    public dialogRef: MatDialogRef<AddNewPostPageComponent>,
    private fb: FormBuilder,
    private userServices: UserServices
  ) { }

  ngOnInit(): void {
    this.localId  = localStorage.getItem('fb-user')

    this.addNew = this.fb.group({
      title: [this.postData ? this.postData.title : '', Validators.required],
      text: [this.postData ? this.postData.body : '', Validators.required]
    })

    this.currentSub = this.userServices.currentUser$.subscribe((curr: BlogUser) => {
      this.current = curr
    })
  }

  addNewPost() {
    this.loading = true

    const newPost: Post = {
      postOwner: this.current.name,
      date: new Date(),
      title: this.addNew.get('title').value,
      body: this.addNew.get('text').value
    }

    if(this.postData){
      this.createNewSub = this.userServices.updateClientPost(newPost, this.postData.fbId, this.localId).subscribe(() => {
        this.loading = false
        this.addNew.reset()
      }, error => {
        this.loading = false
      })
    } else {
      this.createNewSub = this.userServices.createNewPost(newPost, this.localId).subscribe(() => {
        this.loading = false
        this.addNew.reset()
      }, error => {
        this.loading = false
      })
    }
  }

  ngOnDestroy(): void {
    if(this.currentSub){
      this.currentSub.unsubscribe()
    }

    if(this.createNewSub){
      this.createNewSub.unsubscribe()
    }
  }
}
