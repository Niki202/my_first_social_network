import {combineReducers, legacy_createStore} from "redux";
import {postsReducer} from "./Posts-reducer";
import {dialogsReducer} from "./Dialogs-reducer";
import {usersReducer} from "./Users-reducer";

const reducers = combineReducers({
    myPostPage: postsReducer,
    dialogsPage: dialogsReducer,
    users: usersReducer
})

export const store = legacy_createStore(reducers)


