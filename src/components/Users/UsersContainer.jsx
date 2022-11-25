import {UserApiComponent} from "./UsersApiComponent";
import {
    FOLLOW_AC,
    SET_CURRENT_PAGE_AC,
    SET_IS_FETCHING_AC,
    SET_TOTAL_USERS_AC,
    SET_USERS_AC,
    UNFOLLOW_AC
} from "../../Redux/Users-reducer";
import {connect} from "react-redux";



const mapStateToProps = (state) => {
    return({
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsers: state.usersPage.totalUsers,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
    })
}

const mapDispatchToProps = (dispatch) => {
    return({
        setUsers: (users) => {
            dispatch(SET_USERS_AC(users))
        },
        follow: (userId) => {
            dispatch(FOLLOW_AC(userId))
        },
        unfollow: (userId) => {
            dispatch(UNFOLLOW_AC(userId))
        },
        setCurrentPage: (page) => {
            dispatch(SET_CURRENT_PAGE_AC(page))
        },
        setTotalUsers: (totalUsers) => {
            dispatch(SET_TOTAL_USERS_AC(totalUsers))
        },
        setIsFetching: (value) => {
            dispatch(SET_IS_FETCHING_AC(value))
        }
    })
}

const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(UserApiComponent)


export default UsersContainer
