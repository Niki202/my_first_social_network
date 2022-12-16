import React from "react";
import {Preloader} from "../Common/Preloader/Preloader"

import {Users} from "./Users";


export class UserApiComponent extends React.Component {
    // Этод метод срабатывает после отрисовки компоненты
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
    }

    // При нажатии на номер страницы (<NavLink>) в каруселе страниц срабатывает этот метод
    onPageClicked = (page) => {
        this.props.getUsers(page, this.props.pageSize)
    };

    // Этот метод возвращает реакту jsx разметку
    render() {
        return (
            <>
                {this.props.isFetching
                    ? <Preloader/>
                    : <Users {...this.props}
                             onPageClicked={this.onPageClicked}
                    />}
            </>
        )
    }
}
