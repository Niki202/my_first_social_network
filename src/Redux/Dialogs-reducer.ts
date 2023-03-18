
//types

import {Reducer} from "redux";
import {DialogType, UserMessagesType} from "../Types/Types";


// Action types
type AddMessageActionType = {
    type: typeof ADD_MESSAGE,
    userId: number,
    message: string,
}

export type DialogsReducerActionTypes = AddMessageActionType

// Action creators types
export type AddMessageActionCreatorType = (userId: number, message: string) => AddMessageActionType

// Initial state type
type DialogsReducerStateType = {
    dialogs: Array<DialogType>,
    messages: Array<UserMessagesType>
}

// Reducer type
type DialogsReducerType = Reducer<DialogsReducerStateType, AddMessageActionType>

// Constants
export const ADD_MESSAGE = 'ADD_MESSAGE'

// Action creators
export const addMessage: AddMessageActionCreatorType = (userId, message) => ({type: ADD_MESSAGE, userId, message})

// Initial state
const initialState: DialogsReducerStateType = {
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

// Reducer
export const dialogsReducer: DialogsReducerType = (state=initialState, action) => {
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