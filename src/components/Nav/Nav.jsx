import classes from './Nav.module.css'
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";
import {setMyProfileFromAuth} from "../../Redux/Profile-reducer";

// const activeClassName = (navData) => {
//     if (navData.isActive === true){
//         return classes.active
//     } else {
//         return undefined
//     }
// }
export const activeClassName = (element) => element.isActive ? classes.active : undefined

const Nav = (props) => {
    return (
        <nav className={classes.nav}>
            <div>
                {props.isAuth
                    ? <NavLink to={'/profile/' + props.userId}
                               className={activeClassName}
                               onClick={() => props.setMyProfile()}>Profile</NavLink>
                    : <NavLink to='/login' className={activeClassName}>Profile</NavLink>}
            </div>
            <div>
                <NavLink to='/dialogs' className={activeClassName}>Message</NavLink>
            </div>
            <div>
                <NavLink to='/news' className={activeClassName}>News</NavLink>
            </div>
            <div>
                <NavLink to='/music' className={activeClassName}>Music</NavLink>
            </div>
            <div>
                <NavLink to='/users' className={activeClassName}>Users</NavLink>
            </div>
            <div>
                <NavLink to='/setting' className={activeClassName}>Setting</NavLink>
            </div>
        </nav>
    )
}
const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    userId: state.auth.userId,
})

export const NavContainer = connect(mapStateToProps, {setMyProfile: setMyProfileFromAuth})(Nav)
