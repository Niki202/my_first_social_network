import {createSelector} from "reselect";
import {RootStateType} from "./redux-store";

// Примитивная функция для доставания данных из стейта
const getUsers = (state: RootStateType) => {
    return state.usersPage.users
}

// селектор запускается только когда меняются входные данные из getUsers
// иначе он предоставляет сохраненный результат
export const getUsersSel = createSelector(getUsers, (users) => {
    // Код который перерабатывает данные из стейта но не срабатывает при каждой перерисовке
    return users.filter(u => true)
})


export const getPageSizeSel = (state: RootStateType) => {
    return state.usersPage.pageSize
}

export const getTotalUsersSel = (state: RootStateType) => {
    return state.usersPage.totalUsers
}

export const getCurrentPageSel = (state: RootStateType) => {
    return state.usersPage.currentPage
}

export const getIsFetchingSel = (state: RootStateType) => {
    return state.usersPage.isFetching
}

export const getButtonsIsDisabledSel = (state: RootStateType) => {
    return state.usersPage.buttonsIsDisabledArr
}

