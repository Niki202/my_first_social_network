import classes from "./InputText.module.css";
import {Field} from "react-final-form";
import React, {FC} from "react";

type PropsType = {
    name: string
    children?: string
}

export const InputText: FC<PropsType> = ({name, children}) => {
    return(
        <Field name={name}
               render={({input, meta}) => (
                   <div>
                       <label className={`${classes.label} ${classes.withError}`}>{children}</label>
                       <input {...input}
                              className={`${classes.input} ${(meta.error || meta.submitError) && meta.touched && classes.withError}`}
                              type="text" autoComplete={'off'}/>
                       {(meta.error || meta.submitError) && meta.touched && (
                           <span className={classes.errorMessage}>{meta.error || meta.submitError}</span>
                       )}
                   </div>
               )}
        />
    )
}