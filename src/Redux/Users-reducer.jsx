export const SET_USERS = 'SET_USERS'
export const FOLLOW = 'FOLLOW'
export const UNFOLLOW = 'UNFOLLOW'


export const SET_USERS_AC = (users) => ({type: SET_USERS, users: users})
export const FOLLOW_AC = (userId) => ({type: FOLLOW, userId: userId})
export const UNFOLLOW_AC = (userId) => ({type: UNFOLLOW, userId: userId})

const initialState = {
    "users": [
        {
            "name": "",
            "id": 26766,
            "uniqueUrlName": null,
            "photos": {
                "small": null,
                "large": null
            },
            "status": null,
            "followed": false
        }
    ]
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
        default:
            return state
    }
}