import classes from './Message.module.css'
import {Field, Form} from "react-final-form";
import React from "react";
import { maxLength2} from "../../../utilites/validators";
import {FORM_ERROR} from "final-form";


const Message = (props) => {
    const messages = props.messages.map(message => {
        return (
            <div key={message.id.toString()}>
                <div className={classes.message}>{message.message}</div>
            </div>
        )
    })

    const onSubmit = async (formData) => {
        props.addMessage(props.userId, formData.newMessageText)
        return {[FORM_ERROR]: 'Login Failed'}
    }

    const showError = (error) => {
        console.log('error: ' + error)
    }

    return (
        <div className={classes.messageList}>
            <div className={classes.messages}>
                {messages}
            </div>
            <MessageForm onSubmit={onSubmit} showError={showError}/>

        </div>
    )
}

const validate = (formValue) => {
    const resMaxLength15 = maxLength2(15)(formValue)
    if (resMaxLength15) return resMaxLength15
}

const MessageForm = (props) => {
    return (
        <Form onSubmit={props.onSubmit}
            // initialValues={{}}
            //   validate={maxLength}
              render={({submitError, handleSubmit, form, submitting, pristine, values}) => (
                  <form
                      // className={classes.sendMessageWrapper}
                      onSubmit={handleSubmit}>
                      <Field
                          // className={classes.input_message}
                          validate={validate}

                          name='newMessageText'>
                          {({meta, input}) => (
                              <div className={classes.sendMessageWrapper}>
                                  <div className={classes.sendMessage}>
                                      <input {...input}
                                             className={`${classes.input_message} ${meta.error && meta.touched && classes.error}`}
                                             type='text'
                                             placeholder='Enter your message...'
                                             // onError={form.reset()}
                                             // onSubmit={form.reset()}
                                      />
                                      <button className={classes.button}
                                              type='submit'
                                              // onSubmit={form.change('newMessageText', 'dfdfd')}
                                          // onChange={form.reset}
                                          onClick={() => {
                                              form.submit()
                                              if (!meta.error){
                                                  form.reset()
                                              }
                                          }}


                                              disabled={submitting || pristine}>Send
                                      </button>
                                  </div>
                                  <div className={classes.errorWrapper}>
                                      {meta.error && meta.touched &&
                                          <span>{meta.error}</span>}{submitError &&
                                      <span>{submitError}</span>}
                                  </div>
                              </div>

                          )}
                      </Field>

                  </form>
              )}/>
    )
}

export default Message