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
import {GET_DIALOGS_actionCreator, GET_MESSAGES_actionCreator} from "./Redux/store";


function App(props) {
  return (
          <div className="app-wrapper">
              <Header/>
              <Nav/>
              <div className='app-wrapper-content'>
                  <Routes>
                      <Route path="/profile" element={<Profile store={props.store}/>}/>
                      <Route path='/dialogs/*' element={<Dialogs dialogs={props.store.dispatch(GET_DIALOGS_actionCreator())}
                                                                 messages={props.store.dispatch(GET_MESSAGES_actionCreator())}/>}/>
                      <Route path='/news' element={<News/>}/>
                      <Route path='/music' element={<Music/>}/>
                      <Route path='/setting' element={<Settings/>}/>
                  </Routes>
              </div>
          </div>
  );
}

export default App;
