import Header from "./Header";
import React from "react";
import {logOut} from "../../Redux/Auth-reducer";
import {connect} from "react-redux";
import {getProfile} from "../../Redux/Profile-reducer";
import {RootStateType} from "../../Redux/redux-store";

export type MapStatePropsType = {
    userId: number | null
    email: string | null,
    login: string | null,
    isAuth: boolean,
}

export type MapDispatchPropsType = {
    logOut: () => void
    getProfile: (userId: number) => void
}

class HeaderContainer extends React.Component<MapStatePropsType & MapDispatchPropsType> {
    render() {
        return (
            <Header {...this.props}/>
        )
    }
}

const mapStateToProps = (state: RootStateType) => ({
    userId: state.auth.userId,
    email: state.auth.email,
    login: state.auth.login,
    isAuth: state.auth.isAuth,
})


export default connect<MapStatePropsType, MapDispatchPropsType, unknown, RootStateType>(mapStateToProps, {logOut, getProfile})(HeaderContainer)
