import {dialogsReducer} from "./Dialogs-reducer";
import {postsReducer} from "./Posts-reducer";



export let store = {
    _state: {
        dialogsPage: {
            "dialogs": [
                {"id": 1, "name": "Dimych"},
                {"id": 2, "name": "Andrew"},
                {"id": 3, "name": "Sveta"},
                {"id": 4, "name": "Boris"},
                {"id": 5, "name": "Vova"},
            ],
            "messages": [
                {userId: 1, userMessages: [
                        {"id": 1, "message": "Hello!"},
                        {"id": 2, "message": "How are you?"},
                        {"id": 3, "message": "A'm fine!"},
                        {"id": 4, "message": "Yo"},
                        {"id": 5, "message": "WTF?"},]},
                {userId: 2, userMessages: [
                        {"id": 1, "message": "Blabla!"},
                        {"id": 2, "message": "I'm andrew!"},]},
                {userId: 3, userMessages: []},
                {userId: 4, userMessages: []},
                {userId: 5, userMessages: [
                        {"id": 1, "message": "Blabla!"},
                        {"id": 2, "message": "I'm Vovan!"},]},
        ],
            'newMessageText': ''
        },
        myPostPage: {
            "posts": [
                {"id": 1, "post": "Hello React!", "likesCount": 11},
                {"id": 2, "post": "This is my first social network!!!", "likesCount": 12},
            ],
            "newPostText": '',
        }
    },
    getState(){
      return this._state
    },
    subscribe(observer){
        this.renderDOM = observer
    },
    dispatch(action){
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)
        this._state.myPostPage = postsReducer(this._state.myPostPage, action)
        this.renderDOM()
    }


}

window.state = store

