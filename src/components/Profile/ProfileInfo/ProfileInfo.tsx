import classes from './ProfileInfo.module.css'
import React, {FC, useState} from "react";
import {Btn} from "../../Common/Buttons/Btn";
import {AvatarContainer} from "./AvatarContainer/AvatarContainer";
import {ProfileDescriptions} from "./ProfileDescriptions/ProfileDescriptions";
import {Status} from "./Status/Status";
import {FORM_ERROR, FormApi} from "final-form";
import {PostForm} from "./PostForm/PostForm";
import {ProfileEditForm} from "./ProfileEditForm/ProfileEditForm";
import {ProfileInfoType, ProfileType} from "../../../Types/Types";

// Types
// Props types
type OwnPropsType = {
    profile: ProfileInfoType
    status: string
    userId: number
    myId: number | null
    updateMyStatus: (status: string) => void
    onSubmitPost: (formData: { newPostText: string}) => void
    uploadPhoto: (file: any) => void
    uploadProfile: (profile: ProfileType) => Promise<any>
}


const ProfileInfo: FC<OwnPropsType> = (props) => {
    const isOwner = props.myId === +props.userId


    const [profileEditMode, changeProfileEditMode] = useState(false)

    // Обработка сообщения сервера об ошибке ввода полей
    const uploadProfile = async (formData: ProfileType) => {
        const toLower = (str: string) => {
            const strSplit: Array<string> = str.split('')
            strSplit[0] = strSplit[0].toLowerCase()
            return strSplit.join('')
        }
        console.log(formData)
        const response = await props.uploadProfile(formData)

        if (response.data.resultCode !== 0) {
            const errors: any = {[FORM_ERROR]: response.data.messages[0]}
            const fullErrorMessage = response.data.messages[0]
            const errorField = fullErrorMessage.match(/(?<=\().*(?=\))/)[0]
            const errorMessage = fullErrorMessage.match(/\b.*(?=\s\()/)[0]
            if (/Contacts->/.test(errorField)){
                const errorContactField = errorField.match(/(?<=Contacts->).+/)[0]
                errors.contacts = {}
                errors.contacts[toLower(errorContactField)] = errorMessage
            } else {
                errors[toLower(errorField)] = errorMessage
            }
            return errors
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



export default ProfileInfo