import React, {FC} from "react";
import classes from "./Login.module.css";
import {connect} from "react-redux";
import {getAuthData, logIn} from "../../Redux/Auth-reducer";
import {Navigate} from "react-router-dom";
import {required} from "../../utilites/validators";
import {FORM_ERROR} from "final-form";
import {RootStateType} from "../../Redux/redux-store";
import { LoginForm } from "./LoginForm/LoginForm";

export type FormDataType = {
    email?: string,
    password?: string,
    rememberMe: boolean,
    captcha?:string
}
type FormDataToSendType = {
    email: string,
    password: string,
    rememberMe: boolean,
    captcha?:string | undefined
}

export type ErrorsFormType = {
    email?: string,
    password?: string
}

type MapStatePropsType = {
    isAuth: boolean,
    userId: number | null,
    captchaURL: string | null,
}

type MapDispatchPropsType = {
    logIn: (email: string, password: string, rememberMe: boolean, captcha?: string) => any,
    getAuthData: () => void

}


const Login: FC<MapStatePropsType & MapDispatchPropsType> = (props) => {
    const onSubmit = async (formData: FormDataToSendType) => {
        const {email, password, rememberMe, captcha} = formData
        const submitError = await props.logIn(email, password, rememberMe, captcha)
        if (submitError) return {[FORM_ERROR]: submitError}

    }
    const validate = (formData: FormDataType) => {
        const errors: ErrorsFormType = {}
        errors.email = required(formData.email)
        errors.password = required(formData.password)
        // if (required(formData.email)) errors.email = required(formData.email)
        // if (required(formData.password)) errors.password = required(formData.password)
        return errors
    }
    if (props.isAuth) {
        return <Navigate to={`/profile/${props.userId}`}/>
    }
    return (
        <div>
            <h1 className={classes.head}>Sing in</h1>
            <LoginForm onSubmit={onSubmit}
                       validate={validate}
                       captchaURL={props.captchaURL}/>
        </div>
    )
}

const mapStateToProps = (state: RootStateType): MapStatePropsType => ({
    isAuth: state.auth.isAuth,
    userId: state.auth.userId,
    captchaURL: state.auth.captchaURL,
})

export default connect<MapStatePropsType, MapDispatchPropsType, unknown, RootStateType>(mapStateToProps, {logIn, getAuthData})(Login)