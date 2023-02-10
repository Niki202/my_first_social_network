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