import {createSelector} from "reselect";

// Примитивная функция для доставания данных из стейта
const getUsers = (state) => {
    return state.usersPage.users
}

// селектор запускается только когда меняются входные данные из getUsers
// иначе он предоставляет сохраненный результат
export const getUsersSel = createSelector(getUsers, (users) => {
    console.log('calculate')
    // Код который перерабатывает данные из стейта но не срабатывает при каждой перерисовке
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

