import {getAuthData} from "./Auth-reducer";

const INITIALIZED_SUCCESS = 'APP/INITIALIZED_SUCCESS'

export const initializedSuccess = () => ({type: INITIALIZED_SUCCESS})

const initialState = {
    initialized: false
}


export const appReducer = (state=initialState, action) => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            }
        default:
            return state
    }
}

export const initializeApp = () => (dispatch) => {
    const getAuthDataPromise = dispatch(getAuthData())
    // getAuthDataPromise.then(() => {
    //
    // })
    // const getStatusPromise = dispatch(getUserStatus())
    // promise.then((res) => {
    //     console.log(res)
    //     dispatch(initializedSuccess())
    // })
    Promise.all([getAuthDataPromise]).then(() => {
        // debugger
        dispatch(initializedSuccess())
    })

}