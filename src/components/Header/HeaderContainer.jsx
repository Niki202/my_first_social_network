import Header from "./Header";
import React from "react";
import {logOut} from "../../Redux/Auth-reducer";
import {connect} from "react-redux";
import {getProfile} from "../../Redux/Profile-reducer";

class HeaderContainer extends React.Component {
    render() {
        return (
            <Header {...this.props}/>
        )
    }
}

const mapStateToProps = (state) => ({
    userId: state.auth.userId,
    email: state.auth.email,
    login: state.auth.login,
    isAuth: state.auth.isAuth,
})


export default connect(mapStateToProps, {logOut, getProfile})(HeaderContainer)
