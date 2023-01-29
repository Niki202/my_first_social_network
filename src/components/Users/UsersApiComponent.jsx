import React from "react";
import {Preloader} from "../Common/Preloader/Preloader"

import {Users} from "./Users";
import {addUserToFollowed, addUserToUnfollowed, getUsers} from "../../Redux/Users-reducer";
import {compose} from "redux";
import {connect} from "react-redux";
import {
    getButtonsIsDisabledSel,
    getCurrentPageSel,
    getIsFetchingSel,
    getPageSizeSel,
    getTotalUsersSel,
    getUsersSel
} from "../../Redux/Users-selectors";


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
        console.log('render users')
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
    console.log('map state to props users')
    return ({
        users: getUsersSel(state),
        pageSize: getPageSizeSel(state),
        totalUsers: getTotalUsersSel(state),
        currentPage: getCurrentPageSel(state),
        isFetching: getIsFetchingSel(state),
        buttonsIsDisabledArr: getButtonsIsDisabledSel(state),
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
