export interface LoginData {
  email: string,
  password: string,
  returnSecureToken?: boolean
}

export interface LoginResp {
  idToken: string
  email: string
  refreshToken: string
  expiresIn: string
  localId: string
}

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


export interface Environment {
  production: boolean
  apiKey: string
  authDomain?: string
  databaseURL?: string
  projectId?: string
  storageBucket?: string
  messagingSenderId?: string
  appId?: string
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
