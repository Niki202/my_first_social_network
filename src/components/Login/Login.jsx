import React from "react";
import {Form, Field} from 'react-final-form'
import classes from "./Login.module.css";

const LoginForm = (props) => {
    return (
        <Form onSubmit={props.onSubmit}
              initialValues={{rememberMe: false}}
              render={({ handleSubmit, form, submitting, pristine, values }) => (
                  <form onSubmit={handleSubmit}>
                      <div>
                          <label></label>
                          <Field
                              name="login"
                              component="input"
                              type="text"
                              placeholder="Login"
                          />
                      </div>
                      <div>
                          <label></label>
                          <Field
                              name="password"
                              component="input"
                              type="password"
                              placeholder="Password"
                          />
                      </div>
                      <div>
                          <label>rememberMe</label>
                          <Field name="rememberMe" component="input" type="checkbox" />
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
    }
    return(
        <div>
            <h1>Sing in</h1>
            <LoginForm onSubmit={onSubmit}/>
        </div>
    )
}

export default Login