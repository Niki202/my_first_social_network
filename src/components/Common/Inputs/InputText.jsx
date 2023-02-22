import classes from "./InputText.module.css";
import {Field} from "react-final-form";
import React from "react";

export const InputText = ({name, children}) => {
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