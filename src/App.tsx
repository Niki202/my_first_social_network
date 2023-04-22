import React, {FC} from "react";
// import logo from './logo.svg';
import './App.css';
import {NavContainer} from "./components/Nav/Nav";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import Login from "./components/Login/Login"

import {Routes, Route, BrowserRouter} from "react-router-dom";
import ProfileContainer from "./components/Profile/Profile";
import HeaderContainer from "./components/Header/HeaderContainer";
import Dialogs from "./components/Dialogs/Dialogs";
import UsersApiComponent from "./components/Users/UsersApiComponent";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {withRouter} from "./HOC/withRouter";
import {initializeApp} from "./Redux/App-reducer";
import {Preloader} from "./components/Common/Preloader/Preloader";
import {RootStateType, store} from "./Redux/redux-store";

type MapStatePropsType = {
    initialized: boolean
}

type MapDispatchPropsType = {
    initializeApp: () => void
}

class App extends React.Component<MapStatePropsType & MapDispatchPropsType> {
    componentDidMount() {
        this.props.initializeApp()
    }

    render() {

        // @ts-ignore
        window.state = this.props.store.getState()
        if (!this.props.initialized) {
            return <Preloader/>
        }
        return (
            <div className="app-wrapper" role={'main'}>
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
                        <Route path='/users/:page' element={<UsersApiComponent/>}/>
                        <Route path='/users' element={<UsersApiComponent/>}/>
                        <Route path='/setting' element={<Settings/>}/>
                        <Route path='/login' element={<Login/>}/>
                    </Routes>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: RootStateType) => ({
    initialized: state.app.initialized
})

const AppWithCompose: FC<any> = compose<any>(connect<MapStatePropsType, any, unknown, RootStateType>(mapStateToProps, {initializeApp}), withRouter)(App);

const AppContainer = () => {

    return(
        <BrowserRouter>
            <Provider store={store}>
                {/*<React.StrictMode>*/}
                <AppWithCompose store={store}/>
                {/*</React.StrictMode>*/}
            </Provider>
        </BrowserRouter>
    )
}

export default AppContainer
