import logo from "../../assets/images/Logo.svg";
import classes from "./Header.module.css";
import {NavLink} from "react-router-dom";
import {PreloaderButton} from "../Common/PreloaderButton/PreloaderButton";
import {Preloader} from "../Common/Preloader/Preloader";

const Header = (props) => {
    return (
        <header className={classes.header}>
            <div className={classes.img_wrapper}>
                <img width='100' height='100' src={logo} alt="logo"/>
                <div className={classes.preloaderButtonWrapper}><PreloaderButton/><Preloader/></div>
            </div>
            <div>
                {props.isAuth
                    ? <div>
                        <NavLink to={`/profile/${props.userId}`} tabIndex={-1}>{props.login}
                        </NavLink>
                        <button onClick={props.logOut} tabIndex={-1}>Log out</button>
                    </div>
                    : <NavLink to={'/login'} tabIndex={-1}>
                        <button>Log in</button>
                    </NavLink>}
            </div>
        </header>
    )
}
export default Header