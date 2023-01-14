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
                        <NavLink to={`/profile/${props.userId}`}
                                 onClick={() => props.setMyProfile()}>{props.login}</NavLink>
                        <button onClick={props.onClickLogOut}>Log out</button>
                    </div>
                    : <NavLink to={'/login'}>
                        <button>Log in</button>
                    </NavLink>}
                     {/*: <NavLink to={'/login'}>Login</NavLink>}*/}
            </div>
        </header>
    )
}
export default Header