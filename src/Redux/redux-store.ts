
import {profileReducer, ProfileReducerActionTypes} from "./Profile-reducer";
import {dialogsReducer, DialogsReducerActionTypes} from "./Dialogs-reducer";
import {usersReducer, UsersReducerActionTypes} from "./Users-reducer";
import {authReducer, AuthReducerActionTypes} from "./Auth-reducer";
import {appReducer, appReducerActionTypes} from "./App-reducer";

import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import thunk, {ThunkAction} from "redux-thunk";

// types
export type RootStateType = ReturnType<typeof store.getState>
export type AppDispatchType = typeof store.dispatch
export type GetStateType = () => RootStateType

export type AllActionTypes = appReducerActionTypes | AuthReducerActionTypes | DialogsReducerActionTypes
    | ProfileReducerActionTypes | UsersReducerActionTypes

export type MyThunkType = ThunkAction<Promise<any>, RootStateType, unknown, AllActionTypes>

const RootReducer = combineReducers({
    myPostPage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReducer,
})

export const store = legacy_createStore(RootReducer, applyMiddleware(thunk))





