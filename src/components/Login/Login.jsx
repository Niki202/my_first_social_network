import React from "react";
import {Form, Field} from 'react-final-form'
import classes from "./Login.module.css";
import {connect} from "react-redux";
import {getAuthData, logIn} from "../../Redux/Auth-reducer";
import {Navigate} from "react-router-dom";

const LoginForm = (props) => {
    return (
        <Form onSubmit={props.onSubmit}
              initialValues={{rememberMe: false}}
              render={({handleSubmit, form, submitting, pristine, values}) => (
                  <form onSubmit={handleSubmit}>
                      <div>
                          <label></label>
                          <Field
                              name="email"
                              component="input"
                              type="text"
                              size='50'
                              placeholder="Email"
                          />
                      </div>
                      <div>
                          <label></label>
                          <Field
                              name="password"
                              component="input"
                              type="password"
                              size='50'
                              placeholder="Password"
                          />
                      </div>
                      <div>
                          <label>rememberMe</label>
                          <Field name="rememberMe" component="input" type="checkbox"/>
                      </div>
                      <div className={classes.buttons}>
                          <button className={classes.submit} type="submit" disabled={submitting || pristine}>
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
    }
    if (props.isAuth) {
        return <Navigate to={`/profile/${props.userId}`}/>
    }
    return (
        <div>
            <h1 className={classes.head}>Sing in</h1>
            <LoginForm onSubmit={onSubmit}/>
        </div>
    )
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    userId: state.auth.userId
})

export default connect(mapStateToProps, {logIn, getAuthData})(Login)