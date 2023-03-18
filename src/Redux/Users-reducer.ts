import {followAPI, ResultCodesDefaultEnum, usersAPI} from "../api/api";
import {MyThunkType} from "./redux-store";

// Types
type UserType = {
    name: string,
    id: number,
    "photos": {
        "small": string | null,
        "large": string | null
    },
    "status": string | null,
    "followed": boolean
}

// Initial state
type InitialStateType = {
    users: Array<UserType>,
    pageSize: number,
    totalUsers: number,
    currentPage: number,
    isFetching: boolean,
    buttonsIsDisabledArr: Array<number>
}

// Action Types
type SetUsersActionType = {
    type: typeof SET_USERS,
    users: Array<UserType>,
}
type FollowActionType = {
    type: typeof FOLLOW,
    userId: number
}
type UnfollowActionType = {
    type: typeof UNFOLLOW,
    userId: number
}
type SetCurrentPageActionType = {
    type: typeof SET_CURRENT_PAGE,
    page: number
}
type setTotalUsersActionType = {
    type: typeof SET_TOTAL_USERS,
    totalUsers: number
}
type SetIsFetchingActionType = {
    type: typeof SET_IS_FETCHING,
    value: boolean
}
type AddButtonToDisabledActionType = {
    type: typeof ADD_BUTTON_TO_DISABLED,
    userId: number
}
type RemoveButtonFromDisabledActionType = {
    type: typeof REMOVE_BUTTON_FROM_DISABLED,
    userId: number
}

export type UsersReducerActionTypes = SetUsersActionType | FollowActionType | UnfollowActionType | SetCurrentPageActionType |
    setTotalUsersActionType | SetIsFetchingActionType | AddButtonToDisabledActionType | RemoveButtonFromDisabledActionType

// Action creators types
type SetUsersActionCreatorType = (users: Array<UserType>) => SetUsersActionType
type FollowActionCreatorType = (userId: number) => FollowActionType
type UnfollowActionCreatorType = (userId: number) => UnfollowActionType
type SetCurrentPageActionCreatorType = (page: number) => SetCurrentPageActionType
type SetTotalUsersActionCreatorType = (totalUsers: number) => setTotalUsersActionType
type SetIsFetchingActionCreatorType = (value: boolean) => SetIsFetchingActionType
type AddButtonToDisabledActionCreatorType = (userId: number) => AddButtonToDisabledActionType
type RemoveButtonFromDisabledActionCreatorType = (userId: number) => RemoveButtonFromDisabledActionType

// Constants
const SET_USERS = 'SET_USERS'
const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_TOTAL_USERS = 'SET_TOTAL_USERS'
const SET_IS_FETCHING = 'SET_IS_FETCHING'
const ADD_BUTTON_TO_DISABLED = 'ADD_BUTTON_TO_DISABLED'
const REMOVE_BUTTON_FROM_DISABLED = 'REMOVE_BUTTON_FROM_DISABLED'

// Action creators
export const setUsers: SetUsersActionCreatorType =
    (users) => ({type: SET_USERS, users})

export const follow: FollowActionCreatorType =
    (userId) => ({type: FOLLOW, userId})

export const unfollow: UnfollowActionCreatorType =
    (userId) => ({type: UNFOLLOW, userId})

export const setCurrentPage: SetCurrentPageActionCreatorType =
    (page) => ({type: SET_CURRENT_PAGE, page})

export const setTotalUsers: SetTotalUsersActionCreatorType =
    (totalUsers) => ({type: SET_TOTAL_USERS, totalUsers: totalUsers})

export const setIsFetching: SetIsFetchingActionCreatorType =
    (value) => ({type: SET_IS_FETCHING, value})

export const addButtonToDisabled: AddButtonToDisabledActionCreatorType =
    (userId) => ({type: ADD_BUTTON_TO_DISABLED, userId})

export const removeButtonFromDisabled: RemoveButtonFromDisabledActionCreatorType =
    (userId) => ({type: REMOVE_BUTTON_FROM_DISABLED, userId})

// Initial state
const initialState: InitialStateType = {
    users: [],
    pageSize: 14,
    totalUsers: 0,
    currentPage: 1,
    isFetching: true,
    buttonsIsDisabledArr: []
}

// Reducer
export const usersReducer = (state: InitialStateType = initialState,
                             action: UsersReducerActionTypes): InitialStateType => {
    switch (action.type) {
        case SET_USERS:
            return {
                ...state,
                users: action.users
            }
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(u => u.id === action.userId ? {...u, followed: true} : u
                )
            }
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(u => u.id === action.userId ? {...u, followed: false} : u
                )
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.page
            }
        case SET_TOTAL_USERS:
            return {
                ...state,
                totalUsers: action.totalUsers
            }
        case SET_IS_FETCHING:
            return {
                ...state,
                isFetching: action.value
            }
        case ADD_BUTTON_TO_DISABLED:
            return {
                ...state,
                buttonsIsDisabledArr: [...state.buttonsIsDisabledArr, action.userId]
            }
        case REMOVE_BUTTON_FROM_DISABLED:
            return {
                ...state,
                buttonsIsDisabledArr: state.buttonsIsDisabledArr.filter(id => id !== action.userId)
            }
        default:
            return state
    }
}

//-----Thunk creators-------
// подписаться на юзера
export const addUserToFollowed = (userId: number): MyThunkType => async (dispatch) => {
    dispatch(addButtonToDisabled(userId));
    const resultCode = await followAPI.followUser(userId)
    if (resultCode === ResultCodesDefaultEnum.Success) {
        dispatch(follow(userId))
    }
    dispatch(removeButtonFromDisabled(userId))

}
// отписаться на юзера
export const addUserToUnfollowed = (userId: number): MyThunkType => async (dispatch) => {
    dispatch(addButtonToDisabled(userId));
    const resultCode = await followAPI.unfollowUser(userId)
    if (resultCode === ResultCodesDefaultEnum.Success) {
        dispatch(unfollow(userId))
    }
    dispatch(removeButtonFromDisabled(userId))


}
// загрузить юзеров на страницу с юзеров
export const getUsers = (currentPage: number, pageSize: number): MyThunkType => async (dispatch) => {
    dispatch(setIsFetching(true))
    const data = await usersAPI.getUsersPage(currentPage, pageSize)
    dispatch(setUsers(data.items))
    dispatch(setTotalUsers(data.totalCount))
    dispatch(setCurrentPage(currentPage))
    dispatch(setIsFetching(false))

}