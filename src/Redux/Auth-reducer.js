import {authAPI, profileAPI} from "../api/api";

const SET_USER_AUTH_DATA = 'SET_USER_AUTH_DATA'
const SET_MY_PROFILE = 'SET_MY_PROFILE'
const SET_MY_STATUS = 'SET_MY_STATUS'
const SET_INITIAL_STATE = 'SET_INITIAL_STATE'

const setUserAuthData = (userId, email, login) => ({type: SET_USER_AUTH_DATA, userId, email, login})
const setMyProfile = (profile) => ({type: SET_MY_PROFILE, profile})
const setMyStatus = (status) => ({type: SET_MY_STATUS, status})
const setInitialState = (initialState) => ({type: SET_INITIAL_STATE, initialState})


const initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    status: null,
    myProfile: {
        aboutMe: null,
        contacts: {
            facebook: null,
            website: null,
            vk: null,
            twitter: null,
            instagram: null,
            youtube: null,
            github: null,
            mainLink: null
        },
        lookingForAJob: null,
        lookingForAJobDescription: null,
        fullName: null,
        userId: null,
        photos: {
            small: null,
            large: null
        }
    }
}

export function authReducer (state=initialState, action) {
    switch (action.type) {
        case SET_USER_AUTH_DATA:
            return(
                {...state,
                userId: action.userId,
                email: action.email,
                login: action.login,
                isAuth: true}
            )
        case SET_MY_PROFILE:
            return {...state,
            myProfile: action.profile}
        case SET_MY_STATUS:
            return {...state,
            status: action.status}
        case SET_INITIAL_STATE:
            return {...action.initialState}
        default:
            return state
    }
}

export const getAuthData = () => {
    return (dispatch) => {
        authAPI.getAuthMe().then(data => {
            if (data) {
                const {id, email, login} = data
                profileAPI.getUserProfile(id).then(data => {
                    dispatch(setUserAuthData(id, email, login))
                    dispatch(setMyProfile(data))
                })
                profileAPI.getStatus(id).then(status => {
                    dispatch(setMyStatus(status))
                })
            }

        })
    }
}

export const logOut = () => (dispatch) => {
    authAPI.logOut().then(res => {
        if (res === 0) dispatch(setInitialState(initialState))
    })
}

export const logIn = (email, password, rememberMe, captcha) => (dispatch) => {
    authAPI.logIn(email, password, rememberMe, captcha).then(resultCode => {
        if (resultCode === 0) {
            dispatch(getAuthData())
        }

    })
}