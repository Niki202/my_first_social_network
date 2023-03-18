import {Field, Form} from "react-final-form";
import {Btn} from "../../../Common/Buttons/Btn";
import React from "react";

export const PostForm = (props) => {
    return (
        <Form onSubmit={props.onSubmit}
              initialValues={{}}
              render={({handleSubmit, form, submitting, pristine, values}) => (
                  <form onSubmit={handleSubmit}>
                      <div>
                          <Field name='newPostText'
                                 component='textarea'
                                 type='text'/>
                      </div>
                      <div>
                          <Btn    btnType={'success'}
                                  type='submit'
                                  disabled={submitting || pristine}>Add post
                          </Btn>
                      </div>
                  </form>
              )}/>
    )
}