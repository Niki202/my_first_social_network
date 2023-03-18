import {profileAPI} from "../api/api";
import {MyThunkType, RootStateType} from "./redux-store";
import {ThunkAction} from "redux-thunk";
import {AnyAction, Reducer} from "redux";
import {PostType, ProfileInfoType, ProfileType} from "../Types/Types";

// Types


//Initial state type
type ProfileReducerStateType = {
    "posts": Array<PostType>,
    profileInfo: ProfileInfoType,
    status: string,
    isFetchingProfile: boolean,
}

// Action types
type AddPostActionType = {
    type: typeof ADD_POST,
    newPostText: string
}
type SetProfileActionType = {
    type: typeof SET_PROFILE,
    profileInfo: ProfileInfoType
}
type SetIsFetchingProfileActionType = {
    type: typeof SET_IS_FETCHING_PROFILE,
    value: boolean
}
type SetStatusActionType = {
    type: typeof SET_STATUS,
    status: string
}

export type ProfileReducerActionTypes =
    AddPostActionType | SetProfileActionType | SetIsFetchingProfileActionType | SetStatusActionType

//Action creators types
type AddPostActionCreatorType = (newPostText: string) => AddPostActionType
type SetProfileActionCreatorType = (profileInfo: ProfileInfoType) => SetProfileActionType
type SetIsFetchingProfileActionCreatorType = (value: boolean) => SetIsFetchingProfileActionType
type SetStatusActionCreatorType = (status: string) => SetStatusActionType

// Reducer types


type ProfileReducerType = Reducer<ProfileReducerStateType, ProfileReducerActionTypes>

// Thunk creators types
export type ThunkType = ThunkAction<Promise<any>, RootStateType, unknown, AnyAction>

//Constants
const ADD_POST = 'ADD-POST'
const SET_PROFILE = 'SET-PROFILE'
const SET_IS_FETCHING_PROFILE = 'SET_IS_FETCHING_PROFILE'
const SET_STATUS = 'SET_STATUS'

// Action creators
export const addPost: AddPostActionCreatorType = (newPostText) => ({type: ADD_POST, newPostText})
export const setProfile: SetProfileActionCreatorType = (profileInfo) => ({type: SET_PROFILE, profileInfo})
export const setIsFetchingProfile: SetIsFetchingProfileActionCreatorType = (value) => ({
    type: SET_IS_FETCHING_PROFILE,
    value
})
export const setStatus: SetStatusActionCreatorType = (status) => ({type: SET_STATUS, status})

//Initial state
const initialState: ProfileReducerStateType = {
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

// Reducer
export const profileReducer: ProfileReducerType = (state = initialState, action) => {
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

// Thunk creators
export const getProfile = (userId: number): MyThunkType => async (dispatch) => {
    dispatch(setIsFetchingProfile(true))

    const profile = await profileAPI.getUserProfile(userId)
    dispatch(setProfile(profile))
    await dispatch(getUserStatus(userId))
    dispatch(setIsFetchingProfile(false))
}

export const getUserStatus = (userId: number): MyThunkType => async (dispatch) => {
    const status = await profileAPI.getStatus(userId)
    return dispatch(setStatus(status))

}

export const updateMyStatus = (status: string): MyThunkType => async (dispatch, getState) => {
    const StateStatus = getState().myPostPage.status
    if (status !== StateStatus) {
        const resultCode = await profileAPI.updateStatus(status)
        if (resultCode === 0) {
            dispatch(setStatus(status))
        }

    }
}

export const uploadPhoto = (file: any): MyThunkType => async (dispatch, getState) => {
    const response = await profileAPI.uploadPhoto(file)
    if (response.data.resultCode === 0) {
        const profileInfo = {
            ...getState().myPostPage.profileInfo,
            photos: response.data.data.photos
        }
        dispatch(setProfile(profileInfo))
    }
}

export const uploadProfile = (obj: ProfileType): MyThunkType => async (dispatch) => {
    const response = await profileAPI.uploadProfile(obj)
    if (response.data.resultCode === 0) {
        await dispatch(getProfile(obj.userId))
    }
    return response
}
