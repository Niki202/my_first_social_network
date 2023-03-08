import {getAuthData} from "./Auth-reducer";


// Types
import {AppDispatchType} from "./redux-store";
type InitializedSuccessActionType = { type: typeof INITIALIZED_SUCCESS }
type AppReducerInitialStateType = typeof initialState

// Constants
const INITIALIZED_SUCCESS = 'APP/INITIALIZED_SUCCESS'

// Action Creators
export const initializedSuccess = (): InitializedSuccessActionType => ({type: INITIALIZED_SUCCESS})


// Initial state
const initialState = {
    initialized: false
}

// Reducer
export const appReducer = (state: AppReducerInitialStateType = initialState,
                           action: InitializedSuccessActionType): AppReducerInitialStateType => {
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

// Thunk creators
export const initializeApp = () => (dispatch: AppDispatchType): void => {
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