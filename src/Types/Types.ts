export type DialogType = {
    id: number,
    name: string
}

export type MessageType = {
    id: number,
    message: string
}

export type UserMessagesType = {
    userId: number,
    userMessages: Array<MessageType>
}

export type PostType = {
    id: number,
    post: string,
    likesCount: number
}
export type ContactsType = {
    "facebook": string | null,
    "website": string | null,
    "vk": string | null,
    "twitter": string | null,
    "instagram": string | null,
    "youtube": string | null,
    "github": string | null,
    "mainLink": string | null
}

export type PhotosType = {
    small: string | null,
    large: string | null
}

export type ProfileInfoType = {
    "aboutMe": string | null,
    "contacts": ContactsType,
    "lookingForAJob": boolean | null,
    "lookingForAJobDescription": string | null,
    "fullName": string | null,
    "userId": number,
    "photos": PhotosType,
}
export type ProfileType = {
    "aboutMe": string,
    "contacts": ContactsType,
    "lookingForAJob": boolean,
    "lookingForAJobDescription": string,
    "fullName": string,
    "userId": number,
}
export type UserType = {
    name: string
    id: number
    photos: PhotosType
    status: string | null
    followed: boolean
}