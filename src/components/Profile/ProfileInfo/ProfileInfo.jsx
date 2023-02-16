import classes from './ProfileInfo.module.css'
import avaImage from '../../../assets/images/Ava.webp'
import React, {useEffect, useState} from "react";
import {Form, Field} from "react-final-form";

const ProfileInfo = (props) => {
    const [statusEditMode, toggleStatusEditMode] = useState(false)
    const [status, setStatus] = useState(props.status)

    const [fileName, setFileName] = useState('Select file')
    const [file, setFile] = useState(null)

    const onDoubleClick = () => {
        if (+props.userId === props.myId) {
            toggleStatusEditMode(true)
        }
    }

    const sendPhoto = (obj, form) => {
        debugger
        // props.uploadPhoto(obj.files[0])
        form.reset()
        // obj.target.value = ''
        // form.restart()
    }

    const savePhoto2 = (e) => {
        const file = e.target.files[0]
        setFile(file)
        setFileName(file.name)

        debugger
    }
    const sendPhoto2 = () => {
        props.uploadPhoto(file)
        const input = document.getElementById('fileInput')
        input.value = ''
        debugger
    }

    const updateStatus = () => {
        props.updateMyStatus(status)
        toggleStatusEditMode(false)
    }
    const onKeyDownEnter = (e) => {
        if (e.key === 'Enter') {
            updateStatus()
        }
    }

    const onChangeStatus = (e) => {
        setStatus(e.target.value)
    }
    // UseEffect cрабатывает при каждой отрисовке компоненты или при изменении зависимостей
    // которые содержатся в массиве переданном вторым аргументом
    // в данном случае статус устанавливается в локальный useState при измененнии статуса в глобальном стейте
    useEffect(() => {
        setStatus(props.status)
    }, [props.status])
    return (
        <>
            <div className={classes.pictWrapper}>
                <img className={classes.img} src='https://99px.ru/sstorage/53/2021/09/mid_333252_961881.jpg'
                     alt="logo"/>
            </div>
            <div className={classes.info}>
                <div className={classes.profile_descriptions}>
                    <div>
                        <div className={classes.avatar_wrapper}>
                            <img src={props.profile.photos.large || avaImage} alt="avatar"/>
                        </div>
                        <label htmlFor={'fileInput'}>{fileName}</label>
                        <input className={classes.inputFile} id={'fileInput'} type={'file'} accept={'image/jpeg, image/png, image/gif'} onChange={(e) => savePhoto2(e)}/>
                        <button disabled={!file} className={classes.button} onClick={sendPhoto2}>Upload</button>
                        {/*<ChangeAvaForm onSubmit={sendPhoto} fileName={fileName} setfilename={setFileName}/>*/}
                    </div>
                    <div className={classes.text}>
                        <div className={classes.name}>
                            {props.profile.fullName}
                        </div>
                        <div className={classes.about}>
                            {props.profile.aboutMe}
                        </div>
                        <div className={classes.job}>
                            <span className={props.profile.lookingForAJob ? classes.jobTrue : classes.jobFalse}>
                                {props.profile.lookingForAJob
                                    ? 'Ищу работу: ' + props.profile.lookingForAJobDescription
                                    : 'Не ищу работу'}
                            </span>
                        </div>
                    </div>
                </div>
                {/*статус*/}
                <div className={classes.status}>
                    {!statusEditMode
                        ? <span onDoubleClick={onDoubleClick}>{props.status
                            ? props.status
                            : 'No status'}</span>
                        : <input onBlur={updateStatus}
                                 onKeyDown={onKeyDownEnter}
                                 onChange={onChangeStatus}
                                 defaultValue={status}
                                 autoFocus={true}/>}
                </div>
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