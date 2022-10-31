import classes from './Nav.module.css'
import {NavLink} from "react-router-dom";

// const activeClassName = (navData) => {
//     if (navData.isActive === true){
//         return classes.active
//     } else {
//         return undefined
//     }
// }
export const activeClassName = (className) => className.isActive ? classes.active : undefined

export const Nav = () => {
    return (
        <nav className={classes.nav}>
            <div>
                <NavLink to='/profile' className={activeClassName}>Profile</NavLink>
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
                <NavLink to='/setting' className={activeClassName}>Setting</NavLink>
            </div>
        </nav>
    )
}
