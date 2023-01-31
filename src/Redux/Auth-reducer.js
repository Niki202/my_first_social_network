import {authAPI, securityAPI} from "../api/api";
import {getUserStatus} from "./Profile-reducer";

const SET_USER_AUTH_DATA = 'SET_USER_AUTH_DATA'
const SET_INITIAL_STATE = 'SET_INITIAL_STATE'
const SET_LOGIN_ERROR = 'SET_LOGIN_ERROR'
const SET_CAPTCHA_URL = 'SET_CAPTCHA_URL'

const setUserAuthData = (userId, email, login) => ({type: SET_USER_AUTH_DATA, userId, email, login})
const setInitialState = (initialState) => ({type: SET_INITIAL_STATE, initialState})
const setLoginError = (resultCode, errorMessage) => ({type: SET_LOGIN_ERROR, errorMessage, resultCode})
const setCaptchaURL = (URL) => ({type: SET_CAPTCHA_URL, URL})


const initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    status: null,
    loginError: {
        resultCode: null,
        message: null
    },
    captchaURL: null,
}

export function authReducer (state=initialState, action) {
    switch (action.type) {
        case SET_USER_AUTH_DATA:
            return(
                {...state,
                    userId: action.userId,
                    email: action.email,
                    login: action.login,
                    isAuth: true
                }
            )
        case SET_INITIAL_STATE:
            return {...action.initialState}
        case SET_LOGIN_ERROR:
            return {
                ...state,
                loginError: {resultCode: action.resultCode ,message: action.errorMessage}
            }
        case SET_CAPTCHA_URL:
            return {
                ...state,
                captchaURL: action.URL
            }
        default:
            return state
    }
}

export const getAuthData = () => {
    return (dispatch) => {
        // debugger
        return authAPI.getAuthMe().then(data => {
            if (data) {
                const {id, email, login} = data
                dispatch(setUserAuthData(id, email, login))
                return dispatch(getUserStatus(id))
            } else {
                return securityAPI.getCaptchaURL.then(url => {
                    // debugger
                    dispatch(setCaptchaURL(url))
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
    authAPI.logIn(email, password, rememberMe, captcha).then(data => {
        if (data.resultCode === 0) {
            dispatch(getAuthData())
        } else if(data.resultCode === 10){
            securityAPI.getCaptchaURL.then(url => {
                console.log(url)
                dispatch(setCaptchaURL(url))
                dispatch(setLoginError(data.resultCode, data.messages[0]))
            })
        } else {
            dispatch(setLoginError(data.resultCode, data.messages[0]))
        }

    })
}