const SET_USERS = 'SET_USERS'
const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_TOTAL_USERS = 'SET_TOTAL_USERS'
const SET_IS_FETCHING = 'SET_IS_FETCHING'
const ADD_BUTTON_TO_DISABLED = 'ADD_BUTTON_TO_DISABLED'
const REMOVE_BUTTON_FROM_DISABLED = 'REMOVE_BUTTON_FROM_DISABLED'

// action creators
export const setUsers = (users) => ({type: SET_USERS, users})
export const follow = (userId) => ({type: FOLLOW, userId})
export const unfollow = (userId) => ({type: UNFOLLOW, userId})
export const setCurrentPage = (page) => ({type: SET_CURRENT_PAGE, page})
export const setTotalUsers = (totalUsersInt) => ({type: SET_TOTAL_USERS, totalUsersInt})
export const setIsFetching = (value) => ({type: SET_IS_FETCHING, value})
export const addButtonToDisabled = (userId) => ({type: ADD_BUTTON_TO_DISABLED, userId})
export const removeButtonFromDisabled = (userId) => ({type: REMOVE_BUTTON_FROM_DISABLED, userId})

const initialState = {
    users: [],
    pageSize: 5,
    totalUsers: 0,
    currentPage: 1,
    isFetching: true,
    buttonsIsDisabled: []
}


export const usersReducer = (state=initialState, action) => {
    switch (action.type) {
        case SET_USERS:
            return {...state,
            users: action.users}
        case FOLLOW:
            return {...state,
            users: state.users.map(u => u.id === action.userId ? {...u, followed: true} : u
            )}
        case UNFOLLOW:
            return {...state,
            users: state.users.map(u => u.id === action.userId ? {...u, followed: false} : u
            )}
        case SET_CURRENT_PAGE:
            return {...state,
            currentPage: action.page}
        case SET_TOTAL_USERS:
            return {...state,
            totalUsers: action.totalUsersInt}
        case SET_IS_FETCHING:
            return {...state,
            isFetching: action.value}
        case ADD_BUTTON_TO_DISABLED:
            return {...state,
            buttonsIsDisabled: [...state.buttonsIsDisabled, action.userId]}
        case REMOVE_BUTTON_FROM_DISABLED:
            return {...state,
            buttonsIsDisabled: state.buttonsIsDisabled.filter(id => id !== action.userId)}
        default:
            return state
    }
}