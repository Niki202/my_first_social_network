import logo from "../../assets/images/Logo.svg";
import classes from "./Header.module.css";
import {NavLink} from "react-router-dom";
import {PreloaderButton} from "../Common/PreloaderButton/PreloaderButton";
import {Preloader} from "../Common/Preloader/Preloader";
import {Btn} from "../Common/Buttons/Btn";

const Header = (props) => {
    return (
        <header className={classes.header}>
            <div className={classes.img_wrapper}>
                <img className={classes.img} width='100' height='100' src={logo} alt="logo"/>
                <div className={classes.preloaderButtonWrapper}><PreloaderButton/><Preloader/></div>
            </div>
            <div>
                {props.isAuth
                    ? <div className={classes.profileName}>
                        <NavLink className={classes.profileName} to={`/profile/${props.userId}`} tabIndex={-1}>{props.login}
                        </NavLink>
                        <Btn btnType={'danger'} onClick={props.logOut} children={'Log out'}/>
                    </div>
                    : <NavLink className={classes.profileName} to={'/login'} tabIndex={-1}>
                        <Btn btnType={'success'} label={'Log in'}>Log in</Btn>
                    </NavLink>}
            </div>
        </header>
    )
}
export default Header