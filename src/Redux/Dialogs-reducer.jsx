export const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE_NEW_MESSAGE_TEXT'
export const ADD_MESSAGE = 'ADD_MESSAGE'

export const ADD_MESSAGE_actionCreator = (userId) => ({type: ADD_MESSAGE, userId: userId})
export const UPDATE_NEW_MESSAGE_TEXT_actionCreator = (text) => ({'type': UPDATE_NEW_MESSAGE_TEXT, 'text': text})

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
            state.newMessageText = action.text
            return state
        case ADD_MESSAGE:
            if (state.newMessageText !== '') {
                const index = state.messages
                    .find((message) => message.userId === action.userId).userId - 1
                state.messages[index].userMessages.push({
                    id: state.messages[index].userMessages.length + 1,
                    message: state.newMessageText
                })
                state.newMessageText = ''
            }
            return state
        default:
            return state
    }
}