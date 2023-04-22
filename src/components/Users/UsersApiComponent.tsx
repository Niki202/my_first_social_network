 import React from "react";
import {Preloader} from "../Common/Preloader/Preloader"

import {Users} from "./Users";
import {addUserToFollowed, addUserToUnfollowed, getUsers, setCurrentPage} from "../../Redux/Users-reducer";
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
import {withRouter} from "../../HOC/withRouter";
 import {RootStateType} from "../../Redux/redux-store";
 import {UserType} from "../../Types/Types";

 // types
 type MapStatePropsType = {
     users: Array<UserType>
     pageSize: number
     totalUsers: number
     currentPage: number
     isFetching: boolean
     buttonsIsDisabledArr: Array<number>
 }

 type MapDispatchPropsType = {
     addUserToFollowed: (userId: number) => void
     addUserToUnfollowed: (userId: number) => void
     getUsers: (currentPage: number, pageSize: number) => void
     setCurrentPage: (page: number) => void

 }

 type RouteComponentPropsType = {
     router: {params: {page: number}}
 }

// Component
class UserApiComponent extends React.Component<MapStatePropsType & MapDispatchPropsType & RouteComponentPropsType> {
    // Этод метод срабатывает после отрисовки компоненты
    componentDidMount() {
        if (this.props.router.params.page){
            this.props.setCurrentPage(+this.props.router.params.page)
            this.props.getUsers(+this.props.router.params.page, this.props.pageSize)
        } else {
            this.props.getUsers(this.props.currentPage, this.props.pageSize)
        }

    }

    // При нажатии на номер страницы (<NavLink>) в каруселе страниц срабатывает этот метод
    onPageClicked = (page: number) => {
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

const mapStateToProps = (state: RootStateType) => {
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
    getUsers,
    setCurrentPage,
}

export default compose<any>(
    withRouter,
    connect<MapStatePropsType, any, unknown, RootStateType>(mapStateToProps, mapDispatchToProps)
)(UserApiComponent)
