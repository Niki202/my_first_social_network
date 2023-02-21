import axios from "axios";

const URL = 'https://social-network.samuraijs.com/api/1.0/'

const instance = axios.create({
    baseURL: URL,
    withCredentials: true,
    headers: {
        'API-KEY': '6e74bebb-f2f8-422a-aa59-eb689a03ec7a'
    }
})
// Объект с методами относящимися к эндпоинту "/users"
export const usersAPI = {
    // Получить страницу с указанным номером из списка пользователей
    getUsersPage: async (currentPage, pageSize) => {
        const response = await instance.get(`users?page=${currentPage}&count=${pageSize}`)
        return response.data
    }
}

// Объект с методами относящимися к эндпоинту "/follow"
export const followAPI = {
    // Подписаться на юзера
    followUser: async (userId) => {
        const response = await instance.post(`follow/${userId}`, {})
        return response.data.resultCode
    },
    // Отписаться от юзера
    unfollowUser: async (userId) => {
        const response = await instance.delete(`follow/${userId}`)
        return response.data.resultCode
    }
}

// Объект с методами относящимися к эндпоинту "/auth"
export const authAPI = {
    // Получить данные своего профиля
    getAuthMe: async () => {
        const response = await instance.get(`auth/me`)
        if (response.data.resultCode === 0) {
            return response.data.data
        }

    },
    // Завершить/удалить сессию
    logOut: async () => {
        const response = await instance.delete(`auth/login`)
        if (response.data.resultCode === 0) return 0
    },
    // Начать сессию
    logIn: async (email, password, rememberMe, captcha) => {
        const response = await instance.post(`auth/login`, {email, password, rememberMe, captcha})
        return response.data

    }
}

// Объект с методами относящимися к эндпоинту "/profile"
export const profileAPI = {
    // Получить данные профиля
    getUserProfile: async (userId) => {
        const response = await instance.get(`profile/${userId}`)
        return response.data
    },
    // Получить статус
    getStatus: async (userId) => {
        const response = await instance.get(`profile/status/${userId}`)
        if (response.status === 200) {
            return response.data
        }
    },
    // Обновить статус
    updateStatus: async (status) => {
        const response = await instance.put('profile/status', {status: status})
        return response.data.resultCode
    },
    // Загрузить фото
    uploadPhoto: async (file) => {
        return await instance.put('profile/photo', {image: file}, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        })
    },
    // Обновить профиль
    uploadProfile: async (obj) => {
        return await instance.put('profile', obj)
    }
}

// Объект с методами относящимися к эндпоинту "/security"
export const securityAPI = {
    getCaptchaURL: async () => {
        const response = await instance.get('security/get-captcha-url')
        return response.data.url
    }
}
