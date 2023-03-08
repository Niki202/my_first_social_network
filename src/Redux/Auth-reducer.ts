import {authAPI, securityAPI} from "../api/api";

// Types
import {AppDispatchType} from "./redux-store";

// Action types
type SetUserAuthDataActionType = {
    type: typeof SET_USER_AUTH_DATA,
    userId: number,
    email: string,
    login: string
}
type SetInitialStateActionType = {
    type: typeof SET_INITIAL_STATE,
    initialState: InitialStateType
}
type SetCaptchaUrlActionType = {
    type: typeof SET_CAPTCHA_URL,
    URL: string
}

type AuthReducerActionType = SetUserAuthDataActionType | SetInitialStateActionType | SetCaptchaUrlActionType

// Action creators types
type SetUserAuthDataActionCreatorType = (userId: number, email: string, login: string) => SetUserAuthDataActionType
type SetInitialStateActionCreatorType = (initialState: InitialStateType) => SetInitialStateActionType
type SetCaptchaUrlActionCreatorType = (URL: string) => SetCaptchaUrlActionType

// Initial state types
type InitialStateType = {
    userId: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean,
    status: string | null,
    captchaURL: string | null,
}

// Auth reducer type
type AuthReducerType = (state: InitialStateType, action: AuthReducerActionType) => InitialStateType

// Thunk creators types
type GetAuthDataThunkCreatorType = () => (dispatch: AppDispatchType) => Promise<any>
type LogOutThunkCreatorType = () => (dispatch: AppDispatchType) => void
type LogInThunkCreatorType = (email: string, password: string, rememberMe: boolean, captcha: string) =>
    (dispatch: AppDispatchType) => Promise<any>

// Constants
const SET_USER_AUTH_DATA = 'AUTH/SET_USER_AUTH_DATA'
const SET_INITIAL_STATE = 'AUTH/SET_INITIAL_STATE'
const SET_CAPTCHA_URL = 'AUTH/SET_CAPTCHA_URL'

// Action Creators
export const setUserAuthData: SetUserAuthDataActionCreatorType = (userId, email, login) => (
    {type: SET_USER_AUTH_DATA, userId, email, login}
)
export const setInitialState: SetInitialStateActionCreatorType = (initialState) => (
    {type: SET_INITIAL_STATE, initialState}
)
export const setCaptchaURL: SetCaptchaUrlActionCreatorType = (URL) => ({type: SET_CAPTCHA_URL, URL})

// Initial state
const initialState: InitialStateType = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    status: null,
    captchaURL: null,
}

// Reducer
export const authReducer: AuthReducerType = (state = initialState, action) => {
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
        case SET_CAPTCHA_URL:
            return {
                ...state,
                captchaURL: action.URL
            }
        default:
            return state
    }
}

// Thunk creators
export const getAuthData: GetAuthDataThunkCreatorType = () => async (dispatch) => {
    const data = await authAPI.getAuthMe()
    if (data) {
        const {id, email, login} = data
        return dispatch(setUserAuthData(id, email, login))
    }

}

export const logOut: LogOutThunkCreatorType = () => (dispatch) => {
    authAPI.logOut().then(res => {
        if (res === 0) dispatch(setInitialState(initialState))
    })
}

export const logIn: LogInThunkCreatorType = (email,password, rememberMe, captcha) => async (dispatch) => {
    const data = await authAPI.logIn(email, password, rememberMe, captcha)
    if (data.resultCode === 0) {
        await dispatch(getAuthData())
    } else if (data.resultCode === 10) {
        const url = await securityAPI.getCaptchaURL()
        dispatch(setCaptchaURL(url))
        return data.messages[0]

    } else {
        return data.messages[0]
    }
}

