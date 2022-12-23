import {getStatus, getUserProfile, updateStatus} from "../api/api";

const ADD_POST = 'ADD-POST'
const UPDATE_NEW_TEXT_POST = 'UPDATE-NEW-TEXT-POST'
const SET_PROFILE = 'SET-PROFILE'
const SET_IS_FETCHING_PROFILE = 'SET_IS_FETCHING_PROFILE'
const SET_STATUS = 'SET_STATUS'

export const addPost = () => ({type: ADD_POST})
export const changeNewPost = (text) => ({'type': UPDATE_NEW_TEXT_POST, 'text': text})
export const setProfile = (profileInfo) => ({type: SET_PROFILE, profileInfo})
export const setIsFetchingProfile = (value) => ({type: SET_IS_FETCHING_PROFILE, value})
export const setStatus = (status) => ({type: SET_STATUS, status})

const initialState = {
    "posts": [
        {"id": 1, "post": "Hello React!", "likesCount": 11},
        {"id": 2, "post": "This is my first social network!!!", "likesCount": 12},
    ],
    profileInfo: {
        "aboutMe": "",
        "contacts": {
            "facebook": "",
            "website": null,
            "vk": "",
            "twitter": "",
            "instagram": "",
            "youtube": null,
            "github": "",
            "mainLink": null
        },
        "lookingForAJob": null,
        "lookingForAJobDescription": "",
        "fullName": "",
        "userId": 2,
        "photos": {
            "small": "",
            "large": ""
        }
    },
    status: '',
    isFetchingProfile: true,
    "newPostText": '',
}


export const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            if (state.newPostText !== '') {
                // Сохраняем в переменную переданный в action текст
                const text = state.newPostText
                // Делаем поверхностную копию state
                const stateCopy = {...state}
                // Внутри копии state делаем копию массива posts
                stateCopy.posts = [...state.posts]
                // Добавляем в массив state.posts новый пост
                stateCopy.posts.push({
                    "id": state.posts.length + 1,
                    "post": text,
                    "likesCount": 0
                })
                // Обнуляем переменную с текстом поста
                stateCopy.newPostText = ''
                // Возвращаем копию state с изменениями
                return stateCopy
            } else {
                return state
            }
        case UPDATE_NEW_TEXT_POST:
            const stateCopy = {...state}
            stateCopy.newPostText = action.text
            return stateCopy
        case SET_PROFILE:
            return {
                ...state,
                profileInfo: action.profileInfo
            }
        case SET_IS_FETCHING_PROFILE:
            return {
                ...state,
                isFetchingProfile: action.value
            }
        case SET_STATUS:
            return {...state,
            status: action.status}
        default:
            return state
    }
}

export const setMyProfileFromAuth = () => {
    return (dispatch, getState) => {
        const myProfile = getState().auth.myProfile
        dispatch(setProfile(myProfile))
        dispatch(setStatus(getState().auth.status))
    }
}

export const getProfile = (userId) => {
    return (dispatch) => {
        dispatch(setIsFetchingProfile(true))
        getUserProfile(userId).then(profile => {
            dispatch(setProfile(profile))
            dispatch(setIsFetchingProfile(false))
        })
    }
}

export const getUserStatus = (userId) => (dispatch) => {
    getStatus(userId).then(status => {
        dispatch(setStatus(status))
    })
}

export const updateMyStatus = (status) => (dispatch, getState) => {
    if (status !== getState().myPostPage.status) {
        updateStatus(status).then(resultCode => {
            if (resultCode === 0) {
                dispatch(setStatus(status))
            }
        })
    }
}
