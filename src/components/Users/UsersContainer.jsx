import {UserApiComponent} from "./UsersApiComponent";
import {
    follow,
    setCurrentPage,
    setIsFetching,
    setTotalUsers,
    setUsers,
    unfollow
} from "../../Redux/Users-reducer";
import {connect} from "react-redux";


const mapStateToProps = (state) => {
    return ({
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsers: state.usersPage.totalUsers,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
    })
}

const mapDispatchToProps = {
    setUsers, follow, unfollow, setCurrentPage, setTotalUsers, setIsFetching
}


const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(UserApiComponent)


export default UsersContainer
