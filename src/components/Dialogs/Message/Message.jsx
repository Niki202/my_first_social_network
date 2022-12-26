import classes from './Message.module.css'
import {Field, Form} from "react-final-form";
import React from "react";


const Message = (props) => {
    const messages = props.messages.map(message => {
        return (
            <div key={message.id.toString()}>
                <div className={classes.message}>{message.message}</div>
            </div>
        )
    })

    const onSubmit = (formData) => {
        props.addMessage(props.userId, formData.newMessageText)
    }

    return (
        <div className={classes.messageList}>
            <div className={classes.messages}>
                {messages}
            </div>
            <MessageForm onSubmit={onSubmit}/>

        </div>
    )
}

const MessageForm = (props) => {
    return (
        <Form onSubmit={props.onSubmit}
              initialValues={{}}
              render={({handleSubmit, form, submitting, pristine, values}) => (
                  <form className={classes.sendMessage}
                        onSubmit={handleSubmit}>
                      <Field className={classes.input_message}
                             id={classes.input_message}
                             placeholder='Enter your message...'
                             name='newMessageText'
                             component='input'
                             type='text'/>
                      <button className={classes.button}
                              type='submit'
                              onClick={() => {
                                  form.submit()
                                  form.reset()
                              }}


                              disabled={submitting || pristine}>Send
                      </button>
                  </form>
              )}/>
    )
}

export default Message