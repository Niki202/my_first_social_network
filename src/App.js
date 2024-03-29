import React from "react";
// import logo from './logo.svg';
import './App.css';
import {NavContainer} from "./components/Nav/Nav";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import Login from "./components/Login/Login"

import {Routes, Route} from "react-router-dom";
import ProfileContainer from "./components/Profile/Profile";
import HeaderContainer from "./components/Header/HeaderContainer";
import Dialogs from "./components/Dialogs/Dialogs";
import UsersApiComponent from "./components/Users/UsersApiComponent";
import {connect} from "react-redux";
import {compose} from "redux";
import {withRouter} from "./HOC/withRouter";
import {initializeApp} from "./Redux/App-reducer";
import {Preloader} from "./components/Common/Preloader/Preloader";


class App extends React.Component {
    componentDidMount() {
        this.props.initializeApp()
    }

    render() {
        window.state = this.props.store.getState()
        if (!this.props.initialized) {
            return <Preloader/>
        }
        return (
            <div className="app-wrapper">
                <HeaderContainer/>
                <NavContainer/>
                <div className='app-wrapper-content'>
                    <Routes>
                        <Route path="/" element={<Login/>}/>
                        <Route path="/profile" element={<Login/>}/>
                        <Route path="/profile/:userId" element={<ProfileContainer/>}/>
                        <Route path='/dialogs/*' element={<Dialogs/>}/>
                        <Route path='/news' element={<News/>}/>
                        <Route path='/music' element={<Music/>}/>
                        <Route path='/users/*' element={<UsersApiComponent/>}/>
                        <Route path='/setting' element={<Settings/>}/>
                        <Route path='/login' element={<Login/>}/>
                    </Routes>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized
})

export default compose(connect(mapStateToProps, {initializeApp}), withRouter)(App);
