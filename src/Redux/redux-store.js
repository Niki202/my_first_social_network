import {combineReducers, legacy_createStore} from "redux";
import {postsReducer} from "./Posts-reducer";
import {dialogsReducer} from "./Dialogs-reducer";

const reducers = combineReducers({
    myPostPage: postsReducer,
    dialogsPage: dialogsReducer
})

export const store = legacy_createStore(reducers)


