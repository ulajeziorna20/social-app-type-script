export type Post = {
  id: number,
  content: string,
  created_at: Date,
  updated_at: Date,
  likes: [],
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
