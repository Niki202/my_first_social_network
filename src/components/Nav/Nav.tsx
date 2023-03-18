import classes from './Nav.module.css'
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";
import {RootStateType} from "../../Redux/redux-store";
import {FC} from "react";

// const activeClassName = (navData) => {
//     if (navData.isActive === true){
//         return classes.active
//     } else {
//         return undefined
//     }
// }

type MapStatePropsType = {
    isAuth: boolean,
    userId: number | null,
}



const Nav: FC<MapStatePropsType> = (props) => {
    const activeClassName = (navLink: { isActive: boolean }): string | undefined => navLink.isActive ? classes.active : undefined
    return (
        <nav className={classes.nav}>
            <div>
                {props.isAuth
                    ? <NavLink to={'/profile/' + props.userId}
                               className={activeClassName}
                               tabIndex={-1}>My profile</NavLink>
                    : <NavLink to='/login' className={activeClassName} tabIndex={-1}>My profile</NavLink>}
            </div>
            <div>
                <NavLink to='/dialogs' className={activeClassName} tabIndex={-1}>Message</NavLink>
            </div>
            <div>
                <NavLink to='/news' className={activeClassName} tabIndex={-1}>News</NavLink>
            </div>
            <div>
                <NavLink to='/music' className={activeClassName} tabIndex={-1}>Music</NavLink>
            </div>
            <div>
                <NavLink to='/users' className={activeClassName} tabIndex={-1}>Users</NavLink>
            </div>
            <div>
                <NavLink to='/setting' className={activeClassName} tabIndex={-1}>Setting</NavLink>
            </div>
        </nav>
    )
}
const mapStateToProps = (state: RootStateType): MapStatePropsType => ({
    isAuth: state.auth.isAuth,
    userId: state.auth.userId,
})

export const NavContainer = connect(mapStateToProps, {})(Nav)
