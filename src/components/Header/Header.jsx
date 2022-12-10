import logo from "../../assets/images/Logo.svg";
import classes from "./Header.module.css";
import {NavLink} from "react-router-dom";

const Header = (props) => {
    return (
        <header className={classes.header}>
            <div className={classes.img_wrapper}>
                <img width='100' height='100' src={logo} alt="logo"/>
            </div>
            <div>
                {props.isAuth
                    ? <NavLink to={`/profile/${props.userId}`} onClick={() => props.onClickLogin()}>
                        {props.login}
                    </NavLink>
                    : <NavLink to={'/login'} onClick={() => {props.onClickLogin()}}>Login</NavLink>}
            </div>
        </header>
    )
}
export default Header