import classes from './Users.module.css'
import axios from "axios";
import React from "react";

import avaImage from '../../assets/images/Ava.webp'
import {NavLink} from "react-router-dom";


export class User extends React.Component {
    // Этод метод срабатывает после отрисовки компоненты
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`).then(response => {
            this.props.setUsers(response.data.items)
            this.props.setTotalUsers(response.data.totalCount)
        })
    }
    // При нажатии на номер страницы (<NavLink>) в каруселе страниц срабатывает этот метод
    onPageClicked(page){
        this.props.setCurrentPage(page)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${page}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items)
                this.props.setTotalUsers(response.data.totalCount)
        })
    }

    // Этот метод возвращает реакту jsx разметку
    render() {
        const pagesCount = Math.ceil(this.props.totalUsers / this.props.pageSize)
        let pages = []
        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i);
        }
        const startPage = this.props.currentPage - 6 < 0 ? 0 : this.props.currentPage - 6
        const endPage = this.props.currentPage + 5 > this.props.totalUsers ? this.props.totalUsers : this.props.currentPage + 5
        const slicePages = pages.slice(startPage, endPage)
        pages = [slicePages.indexOf(1) === -1 && 1 , ...slicePages, slicePages.indexOf(pagesCount) === -1 && pagesCount]
        return (
            <>
                <div className={classes.paginationWrapper}>
                    {/*Мапимся по массиву с цифрами*/}
                    {pages.map(page => {
                        return (
                            <NavLink
                                className={page === this.props.currentPage && classes.selected}
                                key={page.toString()} to={`users/${page}`}
                                onClick={() => this.onPageClicked(page)}>
                                {page}
                            </NavLink>
                    )})}
                </div>
                <div>
                    {this.props.users.map(u => {
                        return (<div className={classes.user} key={u.id}>
                            <div className={classes.image}>
                                {/*Если ссылки на фото нет в объекте то вставляем универсальную картинку авы*/}
                                <img src={u.photos.small != null ? u.photos.small : avaImage} alt="avatarImage"/>
                            </div>
                            <div className={classes.description}>
                                <div>{u.name}</div>
                                {/*подставляем разные кнопки в зависимости от значения followed в объекте*/}
                                {u.followed
                                    ? <button onClick={() => this.props.unfollow(u.id)}
                                              className={classes.button}>Unfollow</button>
                                    : <button onClick={() => this.props.follow(u.id)}
                                              className={classes.button}>Follow</button>}
                            </div>
                        </div>)
                    })}
                </div>
            </>
        )
    }
}
