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
