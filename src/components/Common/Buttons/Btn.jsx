import classes from "./Btn.module.css";

export const Btn = ({children, label, btnType, labelFor, ...props}) => {
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
