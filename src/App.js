import React from "react";
// import logo from './logo.svg';
import './App.css';
import Header from "./components/Header/Header";
import {Nav} from "./components/Nav/Nav";
import Profile from "./components/Profile/Profile";
import Dialogs from "./components/Dialogs/Dialogs";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";

import {Routes, Route} from "react-router-dom";
import {
    GET_DIALOGS_actionCreator,
    GET_MESSAGES_actionCreator,
    GET_NEW_TEXT_MESSAGE_actionCreator
} from "./Redux/Dialogs-reducer";


function App(props) {
    return (
        <div className="app-wrapper">
            <Header/>
            <Nav/>
            <div className='app-wrapper-content'>
                <Routes>
                    <Route path="/profile" element={<Profile myPostPage={props.store.getState().myPostPage}
                                                             dispatch={props.store.dispatch.bind(props.store)}/>}/>
                    <Route path='/dialogs/*'
                           element={<Dialogs
                               dialogsPage={props.store.getState().dialogsPage}
                               dispatch={props.store.dispatch.bind(props.store)}/>}/>
                    <Route path='/news' element={<News/>}/>
                    <Route path='/music' element={<Music/>}/>
                    <Route path='/setting' element={<Settings/>}/>
                </Routes>
            </div>
        </div>
    );
}

export default App;
