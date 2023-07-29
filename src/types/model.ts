export interface IUser {
    id: string,
    username: string,
    fullName: string,
    avatarURL: string
  }
  export interface IPost {
    id: string,
    initiator_id: string,
    owner_id: string,
    privacy: string,
    caption: string,
    image: string,
    create_at: string
    update_at: string
  }
export interface IComment{
  id: string,
  post_id: string,
  user_id: string,
  content: string,
  create_at: string,
  update_at: string,
  avatar:string,
  full_name:string
}