import classes from "./Dialog.module.css";
import {NavLink} from "react-router-dom";
import {FC} from "react";

type OwnPropsType = {
    key: number,
    id: number,
    name: string
}

const Dialog: FC<OwnPropsType> = (props) => {
    const activeClassName = (navLink: { isActive: boolean }): string | undefined => navLink.isActive ? classes.active : undefined
    return (
        <div className={`${classes.dialog}`}>
            <NavLink className={activeClassName} to={`/dialogs/${props.id}`}>{props.name}</NavLink>
        </div>
    )
}
export default Dialog