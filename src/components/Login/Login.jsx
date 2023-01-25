import React from "react";
import {Form, Field} from 'react-final-form'
import classes from "./Login.module.css";
import {connect} from "react-redux";
import {getAuthData, logIn} from "../../Redux/Auth-reducer";
import {Navigate} from "react-router-dom";
import {required} from "../../utilites/validators";
import {FORM_ERROR} from "final-form";

const LoginForm = (props) => {
    return (
        <Form onSubmit={props.onSubmit}
              initialValues={{rememberMe: false}}
              validate={props.validate}
              render={({submitError, handleSubmit, form, submitting, pristine, values}) => (
                  <form onSubmit={handleSubmit}
                        className={classes.form}>
                      {/*Поле Email*/}
                      <Field name='email'>
                          {({meta, input}) => (
                              <div className={classes.input}>
                                  <div
                                      className={`${classes.inputWrapper}
                                       ${meta.error && meta.touched && classes.withError}
                                       ${props.loginError.resultCode === 1 && classes.withError}`}>
                                      <label></label>
                                      <input
                                          {...input}
                                          type="text"
                                          size='50'
                                          placeholder="Email"
                                      />
                                  </div>
                                  {/*Сообщение об ошибке поля Email*/}
                                  {meta.error && meta.touched &&
                                      <div className={classes.errorMessage}>
                                          <span>{meta.error}</span>
                                      </div>}
                              </div>
                          )}
                      </Field>
                      {/*Поле Password*/}
                      <Field name='password'>
                          {({meta, input}) => (
                              <div className={classes.input}>
                                  <div
                                      className={`${classes.inputWrapper} 
                                      ${meta.error && meta.touched && classes.withError}
                                      ${props.loginError.resultCode === 1 && classes.withError}`}>
                                      <label></label>
                                      <input
                                          {...input}
                                          type="password"
                                          size='50'
                                          placeholder="Password"
                                      />
                                  </div>
                                  {/*Сообщение об ошибке поля Password*/}
                                  {meta.error && meta.touched &&
                                      <div className={classes.errorMessage}>
                                          <span>{meta.error}</span>
                                      </div>}
                                  {/*Сообщение об ошибке логинизации после отправки формы*/}
                                  {props.loginError.message &&
                                      <div className={classes.submitErrorMessage}>
                                          <span>{props.loginError.message}</span>
                                      </div>}
                              </div>
                          )}
                      </Field>
                      <div className={classes.input}>
                          <div className={classes.checkBoxWrapper}><label>RememberMe</label>
                              <Field name="rememberMe" component="input" type="checkbox"/></div>
                      </div>
                      {props.captchaURL &&
                          <div>
                              <div className={classes.captchaWrapper}>
                                  <img src={props.captchaURL} alt='captcha'/>
                              </div>
                              <Field name='captcha'>
                                  {({meta, input}) => (
                                      <div className={classes.input}>
                                          <div
                                              className={`${classes.inputWrapper} ${meta.error && meta.touched && classes.withError}`}>
                                              <label></label>
                                              <input
                                                  {...input}
                                                  type="text"
                                                  size='10'
                                                  placeholder="Enter captcha"
                                              />
                                          </div>
                                          {meta.error && meta.touched &&
                                              <div className={classes.errorMessage}>
                                                  <span>{meta.error}</span>
                                              </div>}
                                      </div>
                                  )}
                              </Field>
                          </div>
                      }
                      <div className={classes.buttons}>
                          <button className={classes.submit} type="submit" disabled={submitting}>
                              Login
                          </button>
                          <button
                              className={classes.reset}
                              type="button"
                              onClick={form.reset}
                              disabled={submitting || pristine}
                          >
                              Reset
                          </button>
                      </div>
                  </form>
              )}
        />
    )
}

const Login = (props) => {
    const onSubmit = (formData) => {
        console.log(formData)
        const {email, password, rememberMe, captcha} = formData
        props.logIn(email, password, rememberMe, captcha)
        return {[FORM_ERROR]: 'Login Failed'}
    }
    const validate = (formData) => {
        const errors = {}
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
                       loginError={props.loginError}
                       captchaURL={props.captchaURL}/>
        </div>
    )
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    userId: state.auth.userId,
    loginError: state.auth.loginError,
    captchaURL: state.auth.captchaURL,
})

export default connect(mapStateToProps, {logIn, getAuthData})(Login)