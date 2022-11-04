const ADD_POST = 'ADD-POST'
const UPDATE_NEW_TEXT_POST = 'UPDATE-NEW-TEXT-POST'
const GET_NEW_TEXT_POST = 'GET-NEW-TEXT-POST'
const GET_DIALOGS = 'GET-DIALOGS'
const GET_MESSAGES = 'GET-MESSAGES'
const GET_POSTS = 'GET-POSTS'

export const ADD_POST_actionCreator = () => ({type: ADD_POST})
export const UPDATE_NEW_TEXT_POST_actionCreator = (text) => ({type: UPDATE_NEW_TEXT_POST, text: text})
export const GET_NEW_TEXT_POST_actionCreator = () => ({type: GET_NEW_TEXT_POST})
export const GET_DIALOGS_actionCreator = () => ({type: GET_DIALOGS})
export const GET_MESSAGES_actionCreator = () => ({type: GET_MESSAGES})
export const GET_POSTS_actionCreator = () => ({type: GET_POSTS})

export let store = {
    _state: {
        "dialogsPage": {
            "dialogs": [
                {"id": 1, "name": "Dimych"},
                {"id": 2, "name": "Andrew"},
                {"id": 3, "name": "Sveta"},
                {"id": 4, "name": "Boris"},
                {"id": 5, "name": "Vova"},
            ],
            "messages": [
                {"id": 1, "message": "Hello!"},
                {"id": 2, "message": "How are you?"},
                {"id": 3, "message": "A'm fine!"},
            ]
        },
        "myPostPage": {
            "posts": [
                {"id": 1, "post": "Hello React!", "likesCount": 11},
                {"id": 2, "post": "This is my first social network!!!", "likesCount": 12},
            ],
            "newPostText": '',
        }
    },
    subscribe(observer){
        store.renderDOM = observer
    },
    dispatch(action){
        if (action.type === ADD_POST) {
            const text = this._state.myPostPage.newPostText
            this._state.myPostPage.posts.push({
                "id": this._state.myPostPage.posts.length + 1,
                "post": text,
                "likesCount": 0
            })
            this._state.myPostPage.newPostText = ''
            store.renderDOM()
        } else if (action.type === UPDATE_NEW_TEXT_POST) {
            debugger
            this._state.myPostPage.newPostText = action.text
            store.renderDOM()
        } else if (action.type === GET_NEW_TEXT_POST){
            return this._state.myPostPage.newPostText
        } else if (action.type === GET_DIALOGS) {
            return this._state.dialogsPage.dialogs
        } else if (action.type === GET_MESSAGES) {
            return this._state.dialogsPage.messages
        } else if (action.type === GET_POSTS) {
            return this._state.myPostPage.posts
        }
    }


}

window.state = store

