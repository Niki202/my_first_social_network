import classes from './ProfileDescriptions.module.css'
import React, {FC} from "react";
import {ContactsType, ProfileInfoType} from "../../../../Types/Types";

type OwnPropsType = {
    profile: ProfileInfoType
}

export const ProfileDescriptions: FC<OwnPropsType> = ({profile, ...props}) => {
    const contacts = profile.contacts
    const contactsKeysArray = Object.keys(contacts)
    return (
        <div className={classes.text}>
            <div className={classes.name}>
                {profile.fullName}
            </div>
            <div className={classes.about}>
                {profile.aboutMe}
            </div>
            <div className={classes.job}>
                            <span className={profile.lookingForAJob ? classes.jobTrue : classes.jobFalse}>
                                {profile.lookingForAJob
                                    ? 'Ищу работу: ' + profile.lookingForAJobDescription
                                    : 'Не ищу работу'}
                            </span>

            </div>
            <div>
                <div>Contacts:</div>
                {contactsKeysArray.map((key: string) => {
                    if (contacts[key as keyof ContactsType]) {
                        return (
                            <div key={key}>{key}: {contacts[key as keyof ContactsType]}</div>
                        )
                    }

                })}
            </div>
        </div>
    )
}