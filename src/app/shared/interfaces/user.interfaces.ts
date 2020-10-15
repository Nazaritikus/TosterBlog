import {Observable} from 'rxjs';

export interface fBUser {
  localId:	string
  email:	string
  emailVerified: boolean
  displayName:	string
  providerUserInfo: any
  photoUrl:	string
  passwordHash:	string
  passwordUpdatedAt: any
  validSince:	string
  disabled:	boolean
  lastLoginAt:	string
  createdAt:	string
  customAuth:	boolean
}

export class BlogUser {
  name: string
  fbId?: string
  photoURL?: string
  aboutInfo?: string
  bgPhotoUrl?: string
  country: string
  city: string
  date: Date
  address?: string
  email: string
  posts?: string[]
  localId?: string
}

export class Post {
  title: string
  body: string
  date: Date
  postOwner: string
  likes?: string[]
  fbId?: string
  comments?: Comment[]
}

export class Comment {
  commentOwner: string
  text: string
  date: Date
}

export class Subs {
  subscription: string
  fbId?: string
}

export interface Country {
  value: string
  viewValue: string
}

export interface NumbersResp {
  number: number
  text: string
  type: string
}

export interface ComponentCanDeactivate {
  canDeactivate: () => boolean | Observable<boolean>
}
