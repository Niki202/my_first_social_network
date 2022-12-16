import React from "react";
// import logo from './logo.svg';
import './App.css';
import {NavContainer} from "./components/Nav/Nav";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";

import {Routes, Route} from "react-router-dom";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import ProfileContainer from "./components/Profile/Profile";
import UsersContainer from "./components/Users/UsersContainer";
import HeaderContainer from "./components/Header/HeaderContainer";


function App(props) {
    window.state = props.store.getState()
    return (
        <div className="app-wrapper">
            <HeaderContainer/>
            <NavContainer/>
            <div className='app-wrapper-content'>
                <Routes>
                    <Route path="/profile/:userId" element={<ProfileContainer/>}/>
                    <Route path='/dialogs/*' element={<DialogsContainer/>}/>
                    <Route path='/news' element={<News/>}/>
                    <Route path='/music' element={<Music/>}/>
                    <Route path='/users/*' element={<UsersContainer/>}/>
                    <Route path='/setting' element={<Settings/>}/>
                </Routes>
            </div>
        </div>
    );
}

export default App;
