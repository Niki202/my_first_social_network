import {combineReducers, legacy_createStore} from "redux";
import {profileReducer} from "./Profile-reducer";
import {dialogsReducer} from "./Dialogs-reducer";
import {usersReducer} from "./Users-reducer";
import {authReducer} from "./auth-reducer";

const reducers = combineReducers({
    myPostPage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    auth: authReducer,
})

export const store = legacy_createStore(reducers)


