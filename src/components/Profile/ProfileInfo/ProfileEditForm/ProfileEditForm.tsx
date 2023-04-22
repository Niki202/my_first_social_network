import {Field, Form} from "react-final-form";
import {InputText} from "../../../Common/Inputs/InputText";
import classes from "./ProfileEditForm.module.css";
import {Btn} from "../../../Common/Buttons/Btn";
import React, {FC} from "react";
import {ContactsType, ProfileInfoType, ProfileType} from "../../../../Types/Types";

type OwnPropsType = {
    contacts: ContactsType
    profileInfo: ProfileInfoType
    onSubmit: (profile: ProfileType) => Promise<any>
}

export const ProfileEditForm: FC<OwnPropsType> = ({contacts, profileInfo, ...props}) => {
    return (
        <div>
            <Form onSubmit={props.onSubmit}
                  initialValues={profileInfo}
                  render={({handleSubmit, submitError, form, submitting, pristine, values}) => (
                      <form onSubmit={handleSubmit}>
                          {submitError && <div>{submitError}</div>}

                          <InputText name={"fullName"}>full name:</InputText>
                          <InputText name={"aboutMe"}>about me:</InputText>
                          <div>
                              <label className={classes.label} htmlFor="lookingForAJob">looking for a job: </label>
                              <Field name='lookingForAJob'
                                     id={'lookingForAJob'}
                                     component='input'
                                     type='checkbox'/>
                          </div>
                          <InputText name={"lookingForAJobDescription"}>looking for a job
                              description:</InputText>

                          <div className={classes.button}>
                              <Btn
                                  id={'ProfileEditButton'}
                                  btnType={'success'}
                                  type='submit'
                                  disabled={submitting}>Save
                              </Btn>
                          </div>
                          <div>
                              Contacts:
                          </div>
                          <div className={classes.contacts}>

                              <div >{Object.keys(contacts).map(contact => (
                                  <InputText key={contact} name={`contacts.${contact}`}>{contact}</InputText>

                              ))}</div>
                          </div>
                      </form>
                  )}/>
        </div>
    )
}