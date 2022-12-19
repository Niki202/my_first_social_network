import {getAuthMe, getUserProfile} from "../api/api";

const SET_USER_AUTH_DATA = 'SET_USER_AUTH_DATA'
const SET_MY_PROFILE = 'SET_MY_PROFILE'

const setUserAuthData = (userId, email, login) => ({type: SET_USER_AUTH_DATA, userId, email, login})
const setMyProfile = (profile) => ({type: SET_MY_PROFILE, profile})


const initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
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
        default:
            return state
    }
}

export const getAuthData = () => {

    return (dispatch) => {
        getAuthMe().then(data => {
            if (data) {
                const {id, email, login} = data
                getUserProfile(id).then(data => {
                    dispatch(setUserAuthData(id, email, login))
                    dispatch(setMyProfile(data))
                })
            }

        })
    }
}