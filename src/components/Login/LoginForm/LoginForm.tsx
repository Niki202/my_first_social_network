import {Field, Form} from "react-final-form";
import classes from "../Login.module.css";
import {Btn} from "../../Common/Buttons/Btn";
import {PreloaderButton} from "../../Common/PreloaderButton/PreloaderButton";
import React, {FC} from "react";
import {ErrorsFormType, FormDataType} from "../Login";

type OwnPropsType = {
    onSubmit: (formData: any) =>  Promise<{ "FINAL_FORM/form-error": any; } | undefined>,
    validate: (formData: FormDataType) => ErrorsFormType,
    captchaURL: string | null
}

export const LoginForm: FC<OwnPropsType> = (props) => {
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
                                       ${submitError && classes.withError}`}>
                                      <label></label>
                                      <input
                                          {...input}
                                          type="text"
                                          size={50}
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
                                      ${submitError && classes.withError}`}>
                                      <label></label>
                                      <input
                                          {...input}
                                          type="password"
                                          size={50}
                                          placeholder="Password"
                                      />
                                  </div>
                                  {/*Сообщение об ошибке поля Password*/}
                                  {meta.error && meta.touched &&
                                      <div className={classes.errorMessage}>
                                          <span>{meta.error}</span>
                                      </div>}
                                  {/*Сообщение об ошибке логинизации после отправки формы*/}
                                  {submitError && <div className={classes.submitErrorMessage}><span>{submitError}</span></div>}
                              </div>
                          )}
                      </Field>
                      <div className={classes.input}>
                          <div className={classes.checkBoxWrapper}><label>RememberMe</label>
                              <Field name="rememberMe" component="input" type="checkbox"/></div>
                      </div>
                      {/*Капча*/}
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
                                                  size={10}
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
                          {/*Кнопка отправить*/}
                          <div className={classes.buttonWrapper}>
                              <Btn
                                  btnType={'success'}
                                  type="submit"
                                  disabled={submitting}>
                                  Login{submitting && <PreloaderButton/>}
                              </Btn>
                          </div>
                          {/*Кнопка сбросить*/}
                          <div className={classes.buttonWrapper}>
                              <Btn
                                  btnType={'danger'}
                                  type="button"
                                  onClick={form.reset}
                                  disabled={submitting || pristine}
                              >
                                  Reset
                              </Btn>
                          </div>
                      </div>
                  </form>
              )}
        />
    )
}