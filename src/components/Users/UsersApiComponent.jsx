import axios from "axios";
import React from "react";

import {Users} from "./Users";


export class UserAPIcomponent extends React.Component {
    // Этод метод срабатывает после отрисовки компоненты
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`).then(response => {
            this.props.setUsers(response.data.items)
            this.props.setTotalUsers(response.data.totalCount)
        })
    }

    // При нажатии на номер страницы (<NavLink>) в каруселе страниц срабатывает этот метод
    onPageClicked = (page) => {
        this.props.setCurrentPage(page)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${page}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items)
                this.props.setTotalUsers(response.data.totalCount)
            })
    }

    // Этот метод возвращает реакту jsx разметку
    render() {
        return (
            <Users
                totalUsers={this.props.totalUsers}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                users={this.props.users}
                onPageClicked={this.onPageClicked}
                follow={this.props.follow}
                unfollow={this.props.unfollow}
                />
        )
    }
}
