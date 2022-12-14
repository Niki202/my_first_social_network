import axios from "axios";

const URL = 'https://social-network.samuraijs.com/api/1.0/'

const instance = axios.create({
    baseURL: URL,
    withCredentials: true,
    headers: {
        'API-KEY': '6e74bebb-f2f8-422a-aa59-eb689a03ec7a'
    }
})

// Получить страницу с указанным номером из списка пользователей
export function getUsersPage(currentPage, pageSize) {
    return instance.get(`users?page=${currentPage}&count=${pageSize}`)
        .then(response => response.data)
}
// Подписаться на юзера
export function followUser(userId) {
    return instance.post(`follow/${userId}`, {}).then(res => res.data.resultCode)
}
// Отписаться от юзера
export function unfollowUser(userId) {
    return instance.delete(`follow/${userId}`).then(res => res.data.resultCode)
}
// Получить данные профиля
export function getUserProfile(userId) {
    return  instance.get(`profile/${userId}`).then(response => {
        return response.data
    })
}
// Получить данные своего профиля
export function getAuthMe() {
    return  instance.get(`auth/me`).then(res => {
        if (res.data.resultCode === 0) {
            return res.data.data
        }

    })
}