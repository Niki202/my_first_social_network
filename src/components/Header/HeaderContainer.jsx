import Header from "./Header";
import React from "react";
import {setUserAuthData} from "../../Redux/Auth-reducer";
import {connect} from "react-redux";
import {setIsFetchingProfile} from "../../Redux/Profile-reducer";
import {getAuthMe} from "../../api/api";

class HeaderContainer extends React.Component {
    componentDidMount() {
        getAuthMe().then(data => {
            let {id, email, login} = data
            this.props.setUserAuthData(id, email, login);
            this.props.setIsFetchingProfile(true)
        })
    }
    onClickLogin() {
        this.props.setIsFetchingProfile(true)
    }

    render() {
        return (
            <Header {...this.props} onClickLogin={this.onClickLogin}/>
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
    setUserAuthData,
    setIsFetchingProfile
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer)
