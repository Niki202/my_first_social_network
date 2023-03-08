import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {profileReducer} from "./Profile-reducer";
import {dialogsReducer} from "./Dialogs-reducer";
import {usersReducer} from "./Users-reducer";
import {authReducer} from "./Auth-reducer";
import thunk from "redux-thunk";
import {appReducer} from "./App-reducer";

const reducers = combineReducers({
    myPostPage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReducer,
})

export const store = legacy_createStore(reducers, applyMiddleware(thunk))
export type RootStateType = ReturnType<typeof store.getState>
export type AppDispatchType = typeof store.dispatch


