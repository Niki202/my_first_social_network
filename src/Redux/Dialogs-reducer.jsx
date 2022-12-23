export const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE_NEW_MESSAGE_TEXT'
export const ADD_MESSAGE = 'ADD_MESSAGE'

export const addMessage = (userId) => ({type: ADD_MESSAGE, userId: userId})
export const setNewTextMessage = (text) => ({'type': UPDATE_NEW_MESSAGE_TEXT, 'text': text})

const initialState = {
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
}

export const dialogsReducer = (state=initialState, action) => {
    switch (action.type) {
        case UPDATE_NEW_MESSAGE_TEXT:
            // Возвращаем копию state и изменяем в ней newMessageText на тот что пришел в action
            return {...state,
            newMessageText: action.text}
        case ADD_MESSAGE:
            // Если сообщение не пустое
            if (state.newMessageText !== '') {
                // Создаем поверхностную копию state
                const stateCopy = {...state}
                // Создаем копию списка messages внутри stateCopy
                // Получаем индекс объекта в списке сообщений относящийся к нужному userId
                const index = stateCopy.messages
                    .find((message) => message.userId === action.userId).userId - 1
                // Добавляем сообщение в список с нужным индексом
                stateCopy.messages[index].userMessages.push({
                    // Id ставим как длину списка сообщений + 1
                    id: state.messages[index].userMessages.length + 1,
                    message: state.newMessageText
                })
                stateCopy.newMessageText = ''
                return stateCopy
            }
            return state
        default:
            return state
    }
}