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
    create_at: Date
    update_at: Date
  }
