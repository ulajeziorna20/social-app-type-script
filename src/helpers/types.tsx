export type Post = {
  id: number,
  content: string,
  created_at: Date,
  updated_at: Date,
  likes: User[],
  user?: User
}

export type User = {
  id: number,
  username: string,
  email: string,
  avatar_url: string,
  created_at: Date,
  updated_at?: Date
}

export interface InputValue {
  value: string,
  isValid: boolean,
  error: string
}


export type FormDataLogin = {
  username: string,
  password: string
}

export interface FormDataRegister {
  username: InputValue,
  password: InputValue,
  email: InputValue,
  passwordConfirm: InputValue
}


export type ResponseLogin = {
  error?: boolean,
  id?: number,
  jwt_token: string,
  ttl?: number,
  username?: string
}


export type ObjectContext = {
  loggedUser: ResponseLogin,
  setLoggedUser: (res: ResponseLogin) => void,
  timeStamp: Date,
  setTimeStamp: (stamp: Date) => void
}