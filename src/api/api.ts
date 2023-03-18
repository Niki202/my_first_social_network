import axios from "axios";
import {ProfileInfoType, ProfileType, UserType} from "../Types/Types";

const URL = 'https://social-network.samuraijs.com/api/1.0/'

const instance = axios.create({
    baseURL: URL,
    withCredentials: true,
    headers: {
        'API-KEY': '6e74bebb-f2f8-422a-aa59-eb689a03ec7a'
    }
})
export type GetUsersResponseType = {
    items: Array<UserType>
    totalCount: number
    error: string | null
}

// Объект с методами относящимися к эндпоинту "/users"
export const usersAPI = {
    // Получить страницу с указанным номером из списка пользователей
    getUsersPage: async (currentPage: number, pageSize: number) => {
        const response = await instance.get<GetUsersResponseType>(`users?page=${currentPage}&count=${pageSize}`)
        return response.data
    }
}

export enum ResultCodesDefaultEnum {
    Success = 0,
    Error = 1
}

type DefaultApiResponseType = {
    resultCode: ResultCodesDefaultEnum
    messages: Array<string>
    data: Object
}

// Объект с методами относящимися к эндпоинту "/follow"
export const followAPI = {
    // Подписаться на юзера
    followUser: async (userId: number) => {
        const response = await instance.post<DefaultApiResponseType>(`follow/${userId}`, {})
        return response.data.resultCode
    },
    // Отписаться от юзера
    unfollowUser: async (userId: number) => {
        const response = await instance.delete<DefaultApiResponseType>(`follow/${userId}`)
        return response.data.resultCode
    }
}

type MeResponseType = {
    resultCode: ResultCodesDefaultEnum
    messages: Array<string>,
    data: {
        id: number,
        email: string,
        login: string
    }
}

enum ResultCodesWithCaptchaEnum {
    Success = 0,
    Error = 1,
    CaptchaIsRequired = 10
}

type LoginResponseType = {
    resultCode: ResultCodesWithCaptchaEnum
    messages: Array<string>
    data: {
        userId: number
    }
}


// Объект с методами относящимися к эндпоинту "/auth"
export const authAPI = {
    // Получить данные своего профиля
    getAuthMe: async () => {
        const response = await instance.get<MeResponseType>(`auth/me`)
        return response.data

    },
    // Завершить/удалить сессию
    logOut: async () => {
        const response = await instance.delete<DefaultApiResponseType>(`auth/login`)
        return response.data
    },
    // Начать сессию
    logIn: async (email: string, password: string, rememberMe: boolean, captcha?: string) => {
        const response = await instance.post<LoginResponseType>(`auth/login`, {
            email,
            password,
            rememberMe,
            captcha
        })
        return response.data

    }
}
type UploadPhotoResponseType = {
    resultCode: ResultCodesWithCaptchaEnum
    messages: Array<string>
    data: {
        photos: {
            small: string
            large: string
        }

    }
}

// Объект с методами относящимися к эндпоинту "/profile"
export const profileAPI = {
    // Получить данные профиля
    getUserProfile: async (userId: number) => {
        const response = await instance.get<ProfileInfoType>(`profile/${userId}`)
        return response.data
    },
    // Получить статус
    getStatus: async (userId: number) => {
        const response = await instance.get<string>(`profile/status/${userId}`)
        return response.data
    },
    // Обновить статус
    updateStatus: async (status: string) => {
        const response = await instance.put<DefaultApiResponseType>('profile/status', {status: status})
        return response.data.resultCode
    },
    // Загрузить фото
    uploadPhoto: async (file: any) => {
        return await instance.put<UploadPhotoResponseType>('profile/photo', {image: file}, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        })
    },
    // Обновить профиль
    uploadProfile: async (profileData: ProfileType) => {
        return await instance.put<DefaultApiResponseType>('profile', profileData)
    }
}

type GetCaptchaUrlResponseType = {
    resultCode: ResultCodesWithCaptchaEnum
    messages: Array<string>
    url: string
}

// Объект с методами относящимися к эндпоинту "/security"
export const securityAPI = {
    getCaptchaURL: async () => {
        const response = await instance.get<GetCaptchaUrlResponseType>('security/get-captcha-url')
        return response.data.url
    }
}
