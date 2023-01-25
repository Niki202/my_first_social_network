import classes from "./Users.module.css";
import {NavLink} from "react-router-dom";
import avaImage from "../../assets/images/Ava.webp";
import {PreloaderButton} from "../Common/PreloaderButton/PreloaderButton";
import React from "react";

export const Users = (props) => {
    const pagesCount = Math.ceil(props.totalUsers / props.pageSize)
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }
    const startPage = props.currentPage - 6 < 0 ? 0 : props.currentPage - 6
    const endPage = props.currentPage + 5 > props.totalUsers ? props.totalUsers : props.currentPage + 5
    const slicePages = pages.slice(startPage, endPage)
    pages = [slicePages.indexOf(1) === -1 && 1, ...slicePages, slicePages.indexOf(pagesCount) === -1 && pagesCount]
    return (
        <>
            <div className={classes.paginationWrapper}>
                {/*Мапимся по массиву с цифрами*/}
                {pages.map(page => {
                    return (
                        <NavLink
                            className={page === props.currentPage && classes.selected}
                            key={page.toString()} to={`/users/${page}`}
                            onClick={() => props.onPageClicked(page)}>
                            {page}
                        </NavLink>
                    )
                })}
            </div>
            <div>
                {props.users.map(u => {
                    const disabledButton = props.buttonsIsDisabledArr.some(id => id === u.id)
                    return (<div className={classes.user} key={u.id}>
                        <div className={classes.image}>
                            {/*Если ссылки на фото нет в объекте то вставляем универсальную картинку авы*/}
                            <NavLink to={`/profile/${u.id}`}>
                                <img src={u.photos.small != null ? u.photos.small : avaImage} alt="avatarImage"/>
                            </NavLink>
                        </div>
                        <div className={classes.description}>
                            <div>{u.name}</div>
                            {/*подставляем разные кнопки в зависимости от значения followed в объекте*/}
                            {u.followed
                                ?
                                <button disabled={disabledButton}
                                        onClick={() => props.addUserToUnfollowed(u.id)}
                                        className={classes.button}>Unfollow{disabledButton &&
                                    <PreloaderButton/>}</button>
                                : <button disabled={disabledButton}
                                          onClick={() => props.addUserToFollowed(u.id)}
                                          className={classes.button}>Follow{disabledButton &&
                                    <PreloaderButton/>}</button>}
                        </div>
                    </div>)
                })}
            </div>
        </>
    )
}
