import classes from './Users.module.css'
import axios from "axios";
import React from "react";

import avaImage from '../../assets/images/Ava.webp'



export class User extends React.Component{
    componentDidMount() {
        axios.get('https://social-network.samuraijs.com/api/1.0/users').then(response => {
            this.props.setUsers(response.data.items)
        })
    }

    render() {
        return(
            <div>
                {this.props.users.users.map(u => {
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
        )
    }
}

export default User