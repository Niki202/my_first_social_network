export const ADD_POST = 'ADD-POST'
export const UPDATE_NEW_TEXT_POST = 'UPDATE-NEW-TEXT-POST'

export const ADD_POST_actionCreator = () => ({type: ADD_POST})
export const UPDATE_NEW_TEXT_POST_actionCreator = (text) => ({'type': UPDATE_NEW_TEXT_POST, 'text': text})

const initialState = {
    "posts": [
        {"id": 1, "post": "Hello React!", "likesCount": 11},
        {"id": 2, "post": "This is my first social network!!!", "likesCount": 12},
    ],
    "newPostText": '',
}

export const postsReducer = (state=initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            if (state.newPostText !== '') {
                const text = state.newPostText
                state.posts.push({
                    "id": state.posts.length + 1,
                    "post": text,
                    "likesCount": 0
                })
                state.newPostText = ''
            }
            return state
        case UPDATE_NEW_TEXT_POST:
            state.newPostText = action.text
            return state
        default:
            return state
    }
}