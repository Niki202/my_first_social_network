import classes from "./Users.module.css";
import {NavLink} from "react-router-dom";
import avaImage from "../../assets/images/Ava.webp";
import {PreloaderButton} from "../Common/PreloaderButton/PreloaderButton";
import React from "react";
import {Paginator} from "./Paginator/Paginator";
import {Btn} from "../Common/Buttons/Btn";

export const Users = (props) => {

    return (
        <>
            <Paginator totalUsers={props.totalUsers}
                       pageSize={props.pageSize}
                       currentPage={props.currentPage}
                       onPageClicked={props.onPageClicked}/>
            <div>
                {props.users.map(u => {
                    const disabledButton = props.buttonsIsDisabledArr.some(id => id === u.id)
                    return (<div className={classes.user} key={u.id}>
                        <div className={classes.image}>
                            {/*Если ссылки на фото нет в объекте то вставляем универсальную картинку авы*/}
                            <NavLink to={`/profile/${u.id}`} tabIndex={-1}>
                                <img src={u.photos.small || avaImage} alt="avatarImage"/>
                            </NavLink>
                        </div>
                        <div className={classes.description}>
                            <div className={classes.userName}>{u.name}</div>
                            {/*подставляем разные кнопки в зависимости от значения followed в объекте*/}
                            {u.followed
                                ?
                                <Btn disabled={disabledButton}
                                        onClick={() => props.addUserToUnfollowed(u.id)}
                                        tabIndex={-1}>UNFOLLOW{disabledButton &&
                                    <PreloaderButton/>}</Btn>
                                : <Btn disabled={disabledButton}
                                          onClick={() => props.addUserToFollowed(u.id)}
                                          tabIndex={-1}>FOLLOW{disabledButton &&
                                    <PreloaderButton/>}</Btn>}
                        </div>
                    </div>)
                })}
            </div>
        </>
    )
}
