import {getAuthData} from "./Auth-reducer";


// Types
import {Reducer} from "redux";
import {MyThunkType} from "./redux-store";

// Action types
type InitializedSuccessActionType = { type: typeof INITIALIZED_SUCCESS }

export type appReducerActionTypes = InitializedSuccessActionType

//Action creators types
type InitializedSuccessActionCreatorType = () => InitializedSuccessActionType

// Initial state type
// type AppReducerInitialStateType = typeof initialState
type AppReducerInitialStateType = { initialized: boolean }


// Reducer type
type AppReducerType = Reducer<AppReducerInitialStateType, InitializedSuccessActionType>

// Constants
const INITIALIZED_SUCCESS = 'APP/INITIALIZED_SUCCESS'

// Action Creators
export const initializedSuccess: InitializedSuccessActionCreatorType = () => ({type: INITIALIZED_SUCCESS})


// Initial state
const initialState: AppReducerInitialStateType = {
    initialized: false
}

// Reducer
export const appReducer: AppReducerType = (state = initialState,
                           action) => {
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
export const initializeApp = (): MyThunkType => async (dispatch) => {
    const getAuthDataPromise = dispatch(getAuthData())
    // getAuthDataPromise.then(() => {
    //
    // })
    // const getStatusPromise = dispatch(getUserStatus())
    // promise.then((res) => {
    //     console.log(res)
    //     dispatch(initializedSuccess())
    // })
    await Promise.all([getAuthDataPromise])
    // debugger
    dispatch(initializedSuccess())


}