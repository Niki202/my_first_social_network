import classes from './ProfileDescriptions.module.css'
import React from "react";

export const ProfileDescriptions = ({profile, ...props}) => {
    const contacts = profile.contacts
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
                {Object.keys(contacts).map((key) => {
                    if (contacts[key]) {
                        return (
                            <div key={key}>{key}: {contacts[key]}</div>
                        )
                    }

                })}
            </div>
        </div>
    )
}