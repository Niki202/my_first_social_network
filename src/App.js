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


function App(props) {
    window.state = props.store.getState()
    return (
        <div className="app-wrapper">
            <HeaderContainer/>
            <NavContainer/>
            <div className='app-wrapper-content'>
                <Routes>
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

export default App;
