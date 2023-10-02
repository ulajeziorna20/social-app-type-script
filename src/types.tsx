export type Post = {
  id: number,
  content: string,
  created_at: Date,
  updated_at: Date,
  likes: User[],
  user: User
}

export type User = {
  id: number,
  username: string,
  email: string,
  avatar_url: string,
  created_at: Date,
  updated_at: Date
}

export type FormDataLogin = {
  username: string,
  password: string
}


export type ResponseLogin = {
  error: boolean,
  id: number,
  jwt_token: string,
  ttl: number,
  username: string
}