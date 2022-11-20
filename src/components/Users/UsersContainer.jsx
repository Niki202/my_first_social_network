import Users from "./Users";
import {FOLLOW_AC, SET_USERS_AC, UNFOLLOW_AC} from "../../Redux/Users-reducer";
import {connect} from "react-redux";



const mapStateToProps = (state) => {
    return({
        users: state.users
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
    })
}

const UsersContainer = connect(mapStateToProps,mapDispatchToProps)(Users)


export default UsersContainer
