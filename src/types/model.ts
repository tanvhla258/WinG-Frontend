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
    create_at: string,
    update_at: string,
    initiator_full_name:string
    initiator_avatar:string
    owner_full_name: string,
    owner_avatar:string
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
 
export interface IPending{
  avatar: string,
create_at: string,
 id:  string,
status: string,
user_full_name:  string,
user_id:  string,
user_name:  string
}