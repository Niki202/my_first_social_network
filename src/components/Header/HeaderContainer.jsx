import Header from "./Header";
import React from "react";
import {getAuthData} from "../../Redux/Auth-reducer";
import {connect} from "react-redux";
import {setMyProfileInAuth} from "../../Redux/Profile-reducer";

class HeaderContainer extends React.Component {
    componentDidMount() {
        this.props.getAuthData()
    }

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

const mapDispatchToProps = {
    getAuthData,
    setMyProfile: setMyProfileInAuth,
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer)
