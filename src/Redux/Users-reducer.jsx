const SET_USERS = 'SET_USERS'
const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_TOTAL_USERS = 'SET_TOTAL_USERS'


export const SET_USERS_AC = (users) => ({type: SET_USERS, users})
export const FOLLOW_AC = (userId) => ({type: FOLLOW, userId})
export const UNFOLLOW_AC = (userId) => ({type: UNFOLLOW, userId})
export const SET_CURRENT_PAGE_AC = (page) => ({type: SET_CURRENT_PAGE, page})
export const SET_TOTAL_USERS_AC = (totalUsersInt) => ({type: SET_TOTAL_USERS, totalUsersInt})

const initialState = {
    "users": [],
    "pageSize": 5,
    "totalUsers": 0,
    "currentPage": 1,
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
        default:
            return state
    }
}