import classes from "./Btn.module.css";
import React, {FC} from "react";

type OwnPropsType = {
    children?: any,
    label?: string,
    btnType?: 'success' | 'danger'
    labelFor?: string,
    [otherProps: string]: any
}

export const Btn: FC<OwnPropsType> = ({children, label, btnType, labelFor, ...props}) => {
    if (labelFor){
        return(
            <label {...props}
                   className={`${classes.button} ${classes.label}
                     ${btnType && classes[btnType]}`}
                   htmlFor={labelFor}
                   tabIndex={-1}>
                <span>{label || children}</span>
            </label>
        )
    }
    return (
        <button {...props}
                className={`${classes.button}
                     ${btnType && classes[btnType]}`}
                tabIndex={-1}>
            <span>{label || children}</span>
        </button>
    )
}
