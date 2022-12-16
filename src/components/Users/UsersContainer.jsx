import {UserApiComponent} from "./UsersApiComponent";
import {addUserToFollowed, addUserToUnfollowed, getUsers} from "../../Redux/Users-reducer";
import {connect} from "react-redux";


const mapStateToProps = (state) => {
    return ({
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsers: state.usersPage.totalUsers,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        buttonsIsDisabled: state.usersPage.buttonsIsDisabled,
    })
}

const mapDispatchToProps = {
    addUserToFollowed,
    addUserToUnfollowed,
    getUsers
}


const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(UserApiComponent)


export default UsersContainer
