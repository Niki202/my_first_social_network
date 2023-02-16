import classes from "./Btn.module.css";

export const Btn = ({children, label, btnType, ...props}) => (
    <button {...props}
         className={`${classes.button}
                     ${btnType && classes[btnType]}`}
         tabIndex={-1}>
        <span>{label || children}</span>
    </button>
)
