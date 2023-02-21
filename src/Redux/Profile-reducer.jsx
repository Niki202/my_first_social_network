import {profileAPI} from "../api/api";

const ADD_POST = 'ADD-POST'
const SET_PROFILE = 'SET-PROFILE'
const SET_IS_FETCHING_PROFILE = 'SET_IS_FETCHING_PROFILE'
const SET_STATUS = 'SET_STATUS'

export const addPost = (newPostText) => ({type: ADD_POST, newPostText})
export const setProfile = (profileInfo) => ({type: SET_PROFILE, profileInfo})
export const setIsFetchingProfile = (value) => ({type: SET_IS_FETCHING_PROFILE, value})
export const setStatus = (status) => ({type: SET_STATUS, status})

const initialState = {
    "posts": [
        {"id": 1, "post": "Hello React!", "likesCount": 11},
        {"id": 2, "post": "This is my first social network!!!", "likesCount": 12},
        {"id": 3, "post": "blablabla", "likesCount": 7},
        {"id": 4, "post": "end", "likesCount": 8},
    ],
    profileInfo: {
        "aboutMe": "",
        "contacts": {
            "facebook": null,
            "website": null,
            "vk": null,
            "twitter": null,
            "instagram": null,
            "youtube": null,
            "github": null,
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
}


export const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            if (action.newPostText !== '') {
                return {
                    ...state,
                    posts: [...state.posts,
                        {
                            id: state.posts.length + 1,
                            post: action.newPostText,
                            likesCount: 0
                        }]
                }
            } else {
                return state
            }
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
            return {
                ...state,
                status: action.status
            }
        default:
            return state
    }
}

export const getProfile = (userId) => async (dispatch) => {
    dispatch(setIsFetchingProfile(true))

    const profile = await profileAPI.getUserProfile(userId)
    dispatch(setProfile(profile))
    await dispatch(getUserStatus(userId))
    dispatch(setIsFetchingProfile(false))
}

export const getUserStatus = (userId) => async (dispatch) => {
    const status = await profileAPI.getStatus(userId)
    return dispatch(setStatus(status))

}

export const updateMyStatus = (status) => async (dispatch, getState) => {
    if (status !== getState().myPostPage.status) {
        const resultCode = await profileAPI.updateStatus(status)
        if (resultCode === 0) {
            dispatch(setStatus(status))
        }

    }
}

export const uploadPhoto = (file) => async (dispatch, getState) => {

    const response = await profileAPI.uploadPhoto(file)
    if (response.data.resultCode === 0) {
        const profileInfo = {...getState().myPostPage.profileInfo}
        profileInfo.photos = response.data.data.photos
        dispatch(setProfile(profileInfo))
    }
}

export const uploadProfile = (obj) => async (dispatch, getState) => {
    const response = await profileAPI.uploadProfile(obj)
    if (response.data.resultCode === 0){
        dispatch(getProfile(obj.userId))
    }
    return response
}
