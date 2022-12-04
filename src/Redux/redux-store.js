import {combineReducers, legacy_createStore} from "redux";
import {profileReducer} from "./ProfileReducer";
import {dialogsReducer} from "./Dialogs-reducer";
import {usersReducer} from "./Users-reducer";

const reducers = combineReducers({
    myPostPage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer
})

export const store = legacy_createStore(reducers)


