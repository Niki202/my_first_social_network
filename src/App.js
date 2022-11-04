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


function App(props) {
  return (
          <div className="app-wrapper">
              <Header/>
              <Nav/>
              <div className='app-wrapper-content'>
                  <Routes>
                      <Route path="/profile" element={<Profile myPostPage={props.state.myPostPage}/>}/>
                      <Route path='/dialogs/*' element={<Dialogs dialogsPage={props.state.dialogsPage}/>}/>
                      <Route path='/news' element={<News/>}/>
                      <Route path='/music' element={<Music/>}/>
                      <Route path='/setting' element={<Settings/>}/>
                  </Routes>
              </div>
          </div>
  );
}

export default App;
