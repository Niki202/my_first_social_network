import Header from "./Header";
import React from "react";
import {setUserAuthData} from "../../Redux/auth-reducer";
import {connect} from "react-redux";
import axios from "axios";
import {setIsFetchingProfile} from "../../Redux/Profile-reducer";

class HeaderContainer extends React.Component {
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {withCredentials: true}).then(response => {
            if(response.data.resultCode === 0){
                let {id, email, login} = response.data.data
                this.props.setUserAuthData(id, email, login);
                // this.props.setIsFetchingProfile(true)
            }

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
