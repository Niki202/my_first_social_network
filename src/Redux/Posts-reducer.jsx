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
                // Сохраняем в переменную переданный в action текст
                const text = state.newPostText
                // Делаем поверхностную копию state
                const stateCopy = {...state}
                // Внутри копии state делаем копию массива posts
                stateCopy.posts = [...state.posts]
                // Добавляем в массив state.posts новый пост
                stateCopy.posts.push({
                    "id": state.posts.length + 1,
                    "post": text,
                    "likesCount": 0
                })
                // Обнуляем переменную с текстом поста
                stateCopy.newPostText = ''
                // Возвращаем копию state с изменениями
                return stateCopy
            } else {
                return state
            }
        case UPDATE_NEW_TEXT_POST:
            const stateCopy = {...state}
            stateCopy.newPostText = action.text
            return stateCopy
        default:
            return state
    }
}