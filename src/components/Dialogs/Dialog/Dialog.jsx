import classes from "./Dialog.module.css";
import {NavLink} from "react-router-dom";


const activeClassName = (element) => element.isActive ? classes.active : undefined

const Dialog = (props) => {
    return(
        <div className={`${classes.dialog}`}>
            <NavLink className={activeClassName} to={`/dialogs/${props.id}`}>{props.name}</NavLink>
        </div>
    )
}
export default Dialog