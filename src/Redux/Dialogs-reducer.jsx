export const ADD_MESSAGE = 'ADD_MESSAGE'

export const addMessage = (userId, message) => ({type: ADD_MESSAGE, userId, message})

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
}

export const dialogsReducer = (state=initialState, action) => {
    switch (action.type) {
        case ADD_MESSAGE:
            // Если сообщение не пустое
            if (action.message !== '') {
                const messages = [...state.messages]
                messages[action.userId - 1].userMessages.push({
                    id: messages[action.userId - 1].userMessages.length + 1,
                    message: action.message
                })
                return {...state,
                    "messages": messages}

            }
            return state
        default:
            return state
    }
}