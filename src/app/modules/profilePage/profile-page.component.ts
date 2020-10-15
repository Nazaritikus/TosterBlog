import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AngularFireStorage} from '@angular/fire/storage';
import {MatDialog} from '@angular/material/dialog';

import { Subscription} from 'rxjs';
import {switchMap} from 'rxjs/operators';

import {UserServices} from '@core/services';
import {DialogMessagesComponent} from '@shared/components';
import {BlogUser, ComponentCanDeactivate, Country} from '@shared/interfaces';
import {countries} from '@shared/constants';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit, OnDestroy, ComponentCanDeactivate {

  currentUser: BlogUser
  countries: Country[] = countries
  mainInfo: FormGroup
  aboutAuthor: FormGroup

  profilePhoto: string
  mainFileToUpload: any = null
  bgPhoto: string
  bgFileToUpload: any = null

  currentSub: Subscription
  userMainInfoSub: Subscription
  photoUploadSub: Subscription
  aboutInfoSub: Subscription

  editMode: boolean = true
  buttonText: string = 'Edit'
  localId: string
  unsavedEdits: boolean;

  constructor(
    private userServices: UserServices,
    private formBuilder: FormBuilder,
    private storage: AngularFireStorage,
    private dialog: MatDialog
  ) { }

  canDeactivate(): boolean {
    return this.mainInfo.dirty
  };

  ngOnInit(): void {
    this.currentSub = this.userServices.currentUser$.subscribe((data: BlogUser) => {
      this.currentUser = data
    })

    this.localId  = localStorage.getItem('fb-user')

    this.mainInfo = this.formBuilder.group({
      firstName: [this.currentUser.name.split(' ')[0], Validators.required],
      lastName: [this.currentUser.name.split(' ')[1], Validators.required],
      email: [this.currentUser.email, [Validators.email, Validators.required]],
      country: [ this.currentUser.country],
      city: [ this.currentUser.city],
      date: [ this.currentUser.date.toString()],
      address: [ this.currentUser.address]
    })
    this.mainInfo.disable()

    this.profilePhoto = this.currentUser.photoURL
    this.bgPhoto = this.currentUser.bgPhotoUrl

    this.aboutAuthor = this.formBuilder.group({
      aboutInfo: [this.currentUser.aboutInfo]
    })
  }

  activateEdit() {
    if(this.editMode){
      this.editMode = !this.editMode
      this.mainInfo.enable()
      this.buttonText = 'Cancel'
    } else {
      this.editMode = !this.editMode
      this.buttonText = 'Edit'
      this.mainInfo.disable()
    }
  }

  onFileSelect(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader()
      reader.onload = (e: any) => {
        (event.target.id === 'secondFile') ? this.bgPhoto = e.target.result : this.profilePhoto = e.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
      (event.target.id === 'secondFile') ? this.bgFileToUpload = event.target.files[0] : this.mainFileToUpload = event.target.files[0]
    }
  }

  updateUserMainInfo() {
    const updateUser: BlogUser = {
      ...this.currentUser,
      name: this.mainInfo.get('firstName').value + ' ' + this.mainInfo.get('lastName').value,
      country: this.mainInfo.get('country').value,
      city: this.mainInfo.get('city').value,
      date: this.mainInfo.get('date').value,
      address: this.mainInfo.get('address').value
    }

    this.userMainInfoSub = this.userServices.updateClientProfileData({[updateUser.fbId] : updateUser}, this.localId).subscribe(
      () => this.dialog.open(
        DialogMessagesComponent, {data: {message: 'Your Main Information has been updated.', title: 'WooHoo!'}
        }),
      () => this.dialog.open(
        DialogMessagesComponent, {data: {message: 'Some problems with this update.', title: 'Ooops!'}}))
  }

  async updateUserPhoto(mainPhoto: boolean){
    const updateUser: BlogUser = {
      ...this.currentUser
    }

    let photoPath = `${localStorage.getItem('fb-user')}/${mainPhoto ? 'mainPhoto' : 'coverPhoto'}_${new Date().getTime()}`

    await this.storage.upload(photoPath, mainPhoto ? this.mainFileToUpload : this.bgFileToUpload)

    this.photoUploadSub = this.storage.ref(photoPath).getDownloadURL()
      .pipe(
        switchMap((url) => {
          mainPhoto ? updateUser.photoURL = url : updateUser.bgPhotoUrl = url
          return this.userServices.updateClientProfileData({[updateUser.fbId] : updateUser}, this.localId)
        })).subscribe(
        () => this.dialog.open(
          DialogMessagesComponent, {data: {message: 'Your Photo has been updated.', title: 'WooHoo!'}}),
        () => this.dialog.open(
          DialogMessagesComponent, {data: {message: 'Some problems with uploading photo.', title: 'Oooops!'}})
    )
  }

  updateAboutUserInfo(){
    const updateUser: BlogUser = {
      ...this.currentUser,
      aboutInfo: this.aboutAuthor.get('aboutInfo').value
    }

    this.aboutInfoSub = this.userServices.updateClientProfileData({[updateUser.fbId] : updateUser}, this.localId).subscribe(
      () => this.dialog.open(
        DialogMessagesComponent, {data: {message: 'Information About You has been updated.', title: 'WooHoo!'}}),
      () => this.dialog.open(
        DialogMessagesComponent, {data: {message: 'Some problems with this update.', title: 'Oooops!'}})
    )
  }

  ngOnDestroy(): void {
    if(this.currentSub){ this.currentSub.unsubscribe() }
    if(this.userMainInfoSub){ this.userMainInfoSub.unsubscribe() }
    if(this.photoUploadSub){ this.photoUploadSub.unsubscribe() }
    if(this.aboutInfoSub){ this.aboutInfoSub.unsubscribe() }
  }
}
