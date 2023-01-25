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
    getUsersPage: (currentPage, pageSize) => {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
    }
}

// Объект с методами относящимися к эндпоинту "/follow"
export const followAPI = {
    // Подписаться на юзера
    followUser: (userId) => {
        return instance.post(`follow/${userId}`, {}).then(res => res.data.resultCode)
    },
    // Отписаться от юзера
    unfollowUser: (userId) => {
        return instance.delete(`follow/${userId}`).then(res => res.data.resultCode)
    }
}

// Объект с методами относящимися к эндпоинту "/auth"
export const authAPI = {
    // Получить данные своего профиля
    getAuthMe: () => {
        return instance.get(`auth/me`).then(res => {
            if (res.data.resultCode === 0) {
                return res.data.data
            }
        })
    },
    // Завершить/удалить сессию
    logOut: () => {
        return instance.delete(`auth/login`).then(res => {
            if (res.data.resultCode === 0) return 0
        })
    },
    // Начать сессию
    logIn: (email, password, rememberMe, captcha) => {
        return instance.post(`auth/login`, {email, password, rememberMe, captcha})
            .then(res => {
                return res.data
            })
    }
}

// Объект с методами относящимися к эндпоинту "/profile"
export const profileAPI = {
    // Получить данные профиля
    getUserProfile: (userId) => {
        return instance.get(`profile/${userId}`).then(response => {
            return response.data
        })
    },
    // Получить статус
    getStatus: (userId) => {
        return instance.get(`profile/status/${userId}`).then(res => {
            if (res.status === 200) {
                return res.data
            }
        })
    },
    // Обновить статус
    updateStatus: (status) => {
        return instance.put('profile/status', {status: status}).then(res => res.data.resultCode)
    }
}

// Объект с методами относящимися к эндпоинту "/security"
export const securityAPI = {
    getCaptchaURL: instance.get('security/get-captcha-url').then(res => {
        console.log(res.data.url)
        return res.data.url
    })
}
