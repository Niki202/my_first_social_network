let renderDOM = () => {}
export const state = {
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
        "functions": {
            'addPost': addPost,
            'changeTextArea': changeTextArea
        }
    }
}

function addPost() {
    const text = state.myPostPage.newPostText
    state.myPostPage.posts.push({"id": state.myPostPage.posts.length + 1, "post": text, "likesCount": 0})
    state.myPostPage.newPostText = ''
    renderDOM()
}

function changeTextArea(text){
    state.myPostPage.newPostText = text
    renderDOM()
}

export const subscribe = (observer) => {
    renderDOM = observer
}

window.state = state
