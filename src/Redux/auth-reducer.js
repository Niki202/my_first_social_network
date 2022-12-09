const SET_USER_AUTH_DATA = 'SET_USER_AUTH_DATA'

export const setUserAuthData = (userId, email, login) => ({type: SET_USER_AUTH_DATA, userId, email, login})


const initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
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
        default:
            return state
    }
}