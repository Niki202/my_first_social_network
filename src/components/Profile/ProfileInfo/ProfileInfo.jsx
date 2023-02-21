import classes from './ProfileInfo.module.css'
import React, {useState} from "react";
import {Form, Field} from "react-final-form";
import {Btn} from "../../Common/Buttons/Btn";
import {AvatarContainer} from "./AvatarContainer/AvatarContainer";
import {ProfileDescriptions} from "./ProfileDescriptions/ProfileDescriptions";
import {Status} from "./Status/Status";
import {FORM_ERROR} from "final-form";

const ProfileInfo = (props) => {
    const isOwner = props.myId === +props.userId


    const [profileEditMode, changeProfileEditMode] = useState(false)
    const [avatarEditMode, toggleAvatarEditMode] = useState(props.status)

    // const toggleProfileEditMode = () => {
    //     if (profileEditMode) changeProfileEditMode(false)
    //     else changeProfileEditMode(true)
    // }


    // const sendPhoto = (obj, form) => {
    //     debugger
    //     // props.uploadPhoto(obj.files[0])
    //     form.reset()
    //     // obj.target.value = ''
    //     // form.restart()
    // }


    const uploadProfile = async (formData) => {
        // delete formData.photos
        console.log(formData)
        const response = await props.uploadProfile(formData)
        debugger
        if (response.data.resultCode !== 0) {

            return {[FORM_ERROR]: response.data.messages[0]}
        } else {
            changeProfileEditMode(false)
        }

    }


    // UseEffect cрабатывает при каждой отрисовке компоненты или при изменении зависимостей
    // которые содержатся в массиве переданном вторым аргументом
    // в данном случае статус устанавливается в локальный useState при измененнии статуса в глобальном стейте

    return (
        <>
            <div className={classes.pictWrapper}>
                <img className={classes.img} src='https://99px.ru/sstorage/53/2021/09/mid_333252_961881.jpg'
                     alt="logo"/>
            </div>
            <div className={classes.info}>
                <div className={classes.profile_descriptions}>
                    <div className={classes.profile_descriptions_text}>
                        <AvatarContainer photos={props.profile.photos}
                                         isOwner={isOwner}
                                         uploadPhoto={props.uploadPhoto}
                                         profileEditMode={profileEditMode}/>
                        {!profileEditMode && <ProfileDescriptions profile={props.profile}/>}
                    </div>
                    {/*Кнопка редактировать профиль*/}
                    {isOwner &&
                        (profileEditMode
                            ? <div>
                                <div className={classes.editProfileButton}>
                                    <Btn label={'SAVE'} btnType={'success'}
                                         labelFor={'ProfileEditButton'}/>
                                </div>
                                <div className={classes.editProfileButton}>
                                    <Btn label={'CANCEL'} btnType={'danger'} onClick={() => changeProfileEditMode(false)}/>
                                </div>
                            </div>
                            : <div className={classes.editProfileButton}>
                                <Btn label={'EDIT PROFILE'} onClick={() => changeProfileEditMode(true)}/>
                            </div>)
                    }
                </div>
                {/*статус*/}
                <Status isOwner={isOwner} status={props.status} updateMyStatus={props.updateMyStatus}/>
                {profileEditMode && <ProfileEditForm onSubmit={uploadProfile} profileInfo={props.profile} contacts={props.profile.contacts}/>}
                <div>My posts</div>
                <PostForm onSubmit={props.onSubmitPost}/>
            </div>
        </>
    )
}

const PostForm = (props) => {
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
                          <button className={classes.button}
                                  type='submit'
                                  disabled={submitting || pristine}>Add post
                          </button>
                      </div>
                  </form>
              )}/>
    )
}

const ProfileEditForm = ({contacts, profileInfo, ...props}) => {
    return (
        <div>
            <Form onSubmit={props.onSubmit}
                  initialValues={profileInfo}
                  render={({handleSubmit, submitError, form, submitting, pristine, values}) => (
                      <form onSubmit={handleSubmit}>
                          {submitError && <div>{submitError}</div>}
                          <div>
                              <label className={classes.label} htmlFor="fullName">full name:</label>
                              <Field name='fullName'
                                     id={'fullName'}
                                     component='input'
                                     type='text'/>
                          </div>
                          <div>
                              <label className={classes.label} htmlFor="aboutMe">about Me:</label>
                              <Field name='aboutMe'
                                     id={'aboutMe'}
                                     component='input'
                                     type='text'/>
                          </div>
                          <div>
                              <label className={classes.label} htmlFor="lookingForAJob">looking for a job: </label>
                              <Field name='lookingForAJob'
                                     id={'lookingForAJob'}
                                     component='input'
                                     type='checkbox'/>
                          </div>
                          <div>
                              <label className={classes.label} htmlFor="lookingForAJobDescription">looking for a job
                                  description:</label>
                              <Field name='lookingForAJobDescription'
                                     id={'lookingForAJobDescription'}
                                     component='input'
                                     type='text'/>
                          </div>
                          <div className={classes.button}>
                              <Btn
                                  id={'ProfileEditButton'}
                                  btnType={'success'}
                                  type='submit'
                                  disabled={submitting || pristine}>Add post
                              </Btn>
                          </div>
                          <div className={classes.contacts}>
                              <div>
                                  Contacts:
                              </div>
                              {Object.keys(contacts).map(contact => (
                                  <div className={classes.contact} key={contact}>
                                      <label className={classes.label} htmlFor={contact}>{contact}:</label>
                                      <Field name={`contacts.${contact}`}
                                             id={contact}
                                             component='input'
                                             type='text'/>
                                  </div>
                              ))}
                          </div>
                      </form>
                  )}/>
        </div>
    )
}


const ChangeAvaForm = ({onSubmit, fileName, setFileName, ...props}) => {
    return (
        <Form onSubmit={onSubmit}
              initialValues={{}}
              fileName={fileName}
              setFileName={setFileName}
              render={({handleSubmit, form, submitting, pristine, values}) => (
                  <form onSubmit={handleSubmit}>
                      <div>
                          <FileField name="files"/>
                          <Field name={'text'}
                                 fileName={fileName}
                                 setFileName={setFileName}
                                 render={({meta, input}) => (
                                     <input {...input} type={'text'}/>
                                 )}/>
                          <Field name={'test'} fileName={fileName} setFileName={setFileName}>
                              {({input: {value, onChange, ...input}}) => (
                                  <>
                                      <label className={classes.inputFileLabel}
                                             htmlFor={'inputFile'}>{fileName || 'Выберите файл'}</label>
                                      <input
                                          {...input}
                                          className={classes.inputFile}
                                          id={'inputFile'}
                                          type="file"
                                          onChange={({target}) => {
                                              debugger
                                              onChange(target.files)
                                              // setFileName(target.files[0].name)
                                          }} // instead of the default target.value
                                      />
                                  </>
                              )}
                          </Field>
                      </div>
                      <div>
                          <button className={classes.button}
                                  type='submit'
                                  disabled={submitting}>Upload
                          </button>
                      </div>
                  </form>
              )}/>
    )
}

const FileField = ({name, ...props}) => (
    <Field name={name}>
        {({input: {value, onChange, ...input}}) => (
            <input
                {...input}
                type="file"
                onChange={({target}) => onChange(target.files)} // instead of the default target.value
                {...props}
            />
        )}
    </Field>
);


export default ProfileInfo