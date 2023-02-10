import classes from './ProfileInfo.module.css'
import avaImage from '../../../assets/images/Ava.webp'
import React, {useEffect, useState} from "react";
import {Form, Field} from "react-final-form";

const ProfileInfo = (props) => {
    const [statusEditMode, toggleStatusEditMode] = useState(false)
    const [status, setStatus] = useState(props.status)

    const onDoubleClick = () => {
        if (+props.userId === props.myId) {
            toggleStatusEditMode(true)
        }
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
                    <div className={classes.avatar_wrapper}>
                        <img src={props.profile.photos.large || avaImage} alt="avatar"/>
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


export default ProfileInfo