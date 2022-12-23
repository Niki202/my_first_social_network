import React from "react";
import {Preloader} from "../Common/Preloader/Preloader"

import {Users} from "./Users";
import {addUserToFollowed, addUserToUnfollowed, getUsers} from "../../Redux/Users-reducer";
import {compose} from "redux";
import {connect} from "react-redux";


class UserApiComponent extends React.Component {
    // Этод метод срабатывает после отрисовки компоненты
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
    }

    // При нажатии на номер страницы (<NavLink>) в каруселе страниц срабатывает этот метод
    onPageClicked = (page) => {
        this.props.getUsers(page, this.props.pageSize)
    };

    // Этот метод возвращает реакту jsx разметку
    render() {
        return (
            <>
                {this.props.isFetching
                    ? <Preloader/>
                    : <Users {...this.props}
                             onPageClicked={this.onPageClicked}
                    />}
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return ({
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsers: state.usersPage.totalUsers,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        buttonsIsDisabledArr: state.usersPage.buttonsIsDisabledArr,
    })
}

const mapDispatchToProps = {
    addUserToFollowed,
    addUserToUnfollowed,
    getUsers
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps)
)(UserApiComponent)
