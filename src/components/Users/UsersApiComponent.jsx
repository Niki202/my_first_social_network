import React from "react";
import {Preloader} from "../Common/Preloader/Preloader"

import {Users} from "./Users";
import {getUsersPage} from "../../api/api";


export class UserApiComponent extends React.Component {
    // Этод метод срабатывает после отрисовки компоненты
    componentDidMount() {
        this.props.setIsFetching(true);

        getUsersPage(this.props.currentPage, this.props.pageSize).then(data => {
            // debugger
            this.props.setUsers(data.items);
            this.props.setTotalUsers(data.totalCount);
            this.props.setIsFetching(false);
        })
    }

    // При нажатии на номер страницы (<NavLink>) в каруселе страниц срабатывает этот метод
    onPageClicked = (page) => {
        this.props.setCurrentPage(page);
        this.props.setIsFetching(true);

        getUsersPage(page, this.props.pageSize).then(data => {
            this.props.setUsers(data.items);
            this.props.setTotalUsers(data.totalCount);
            this.props.setIsFetching(false);
        })
    };

    // Этот метод возвращает реакту jsx разметку
    render() {
        return (
            <>
                {this.props.isFetching
                    ? <Preloader/>
                    : <Users
                        totalUsers={this.props.totalUsers}
                        pageSize={this.props.pageSize}
                        currentPage={this.props.currentPage}
                        users={this.props.users}
                        onPageClicked={this.onPageClicked}
                        follow={this.props.follow}
                        unfollow={this.props.unfollow}
                        buttonsIsDisabled={this.props.buttonsIsDisabled}
                        addButtonToDisabled={this.props.addButtonToDisabled}
                        removeButtonFromDisabled={this.props.removeButtonFromDisabled}
                    />}
            </>
        )
    }
}
