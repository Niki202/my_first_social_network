import {authAPI, securityAPI} from "../api/api";

const SET_USER_AUTH_DATA = 'AUTH/SET_USER_AUTH_DATA'
const SET_INITIAL_STATE = 'AUTH/SET_INITIAL_STATE'
const SET_LOGIN_ERROR = 'AUTH/SET_LOGIN_ERROR'
const SET_CAPTCHA_URL = 'AUTH/SET_CAPTCHA_URL'

export const setUserAuthData = (userId, email, login) => ({type: SET_USER_AUTH_DATA, userId, email, login})
export const setInitialState = (initialState) => ({type: SET_INITIAL_STATE, initialState})
export const setLoginError = (resultCode, errorMessage) => ({type: SET_LOGIN_ERROR, errorMessage, resultCode})
export const setCaptchaURL = (URL) => ({type: SET_CAPTCHA_URL, URL})


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

export function authReducer(state = initialState, action) {
    switch (action.type) {
        case SET_USER_AUTH_DATA:
            return (
                {
                    ...state,
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
                loginError: {resultCode: action.resultCode, message: action.errorMessage}
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

export const getAuthData = () => async (dispatch) => {
    // debugger
    const data = await authAPI.getAuthMe()
    if (data) {
        const {id, email, login} = data
        return dispatch(setUserAuthData(id, email, login))
    } else {
        const url = await securityAPI.getCaptchaURL()
        return dispatch(setCaptchaURL(url))

    }

}

export const logOut = () => (dispatch) => {
    authAPI.logOut().then(res => {
        if (res === 0) dispatch(setInitialState(initialState))
    })
}

export const logIn = (email, password, rememberMe, captcha) => async (dispatch) => {
    const data = await authAPI.logIn(email, password, rememberMe, captcha)
    if (data.resultCode === 0) {
        dispatch(getAuthData())
    } else if (data.resultCode === 10) {
        const url = await securityAPI.getCaptchaURL
        dispatch(setCaptchaURL(url))
        dispatch(setLoginError(data.resultCode, data.messages[0]))

    } else {
        dispatch(setLoginError(data.resultCode, data.messages[0]))
    }


}