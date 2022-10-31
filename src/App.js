import React from "react";
// import logo from './logo.svg';
import './App.css';
// import { Body,Body2 } from './jsx/body'
// import { Header } from './jsx/header'
// import { Footer } from './jsx/footer'
// import logo from './img/Logo.svg'
import Header from "./components/Header/Header";
import {Nav} from "./components/Nav/Nav";
import Profile from "./components/Profile/Profile";
import Dialogs from "./components/Dialogs/Dialogs";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";

import {BrowserRouter, Routes, Route} from "react-router-dom";


function App() {
  return (
      <BrowserRouter>
          <div className="app-wrapper">
              <Header/>
              <Nav/>
              <div className='app-wrapper-content'>
                  <Routes>
                      <Route path="/profile" element={<Profile/>}/>
                      <Route path='/dialogs/*' element={<Dialogs/>}/>
                      <Route path='/news' element={<News/>}/>
                      <Route path='/music' element={<Music/>}/>
                      <Route path='/setting' element={<Settings/>}/>
                  </Routes>
              </div>
          </div>
      </BrowserRouter>
  );
}

export default App;
