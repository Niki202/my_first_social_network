import {createSelector} from "reselect";

const getUsers = (state) => {
    return state.usersPage.users
}

export const getUsersSel = createSelector(getUsers, (users) => {
    console.log('calculate')
    return users.filter(u => true)
})


export const getPageSizeSel = (state) => {
    return state.usersPage.pageSize
}

export const getTotalUsersSel = (state) => {
    return state.usersPage.totalUsers
}

export const getCurrentPageSel = (state) => {
    return state.usersPage.currentPage
}

export const getIsFetchingSel = (state) => {
    return state.usersPage.isFetching
}

export const getButtonsIsDisabledSel = (state) => {
    return state.usersPage.buttonsIsDisabledArr
}

