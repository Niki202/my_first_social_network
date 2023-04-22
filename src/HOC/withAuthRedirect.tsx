import React, {ComponentType} from "react";
import {connect} from "react-redux";
import {Navigate} from "react-router-dom";
import {RootStateType} from "../Redux/redux-store";

const mapStateToProps = (state: RootStateType) => ({
    isAuth: state.auth.isAuth
})

// Классовый HOC

// export const withAuthRedirect = (Component) => {
//     class withRedirect extends React.Component {
//         render() {
//             if (!this.props.isAuth) {
//                 return <Navigate to={'/login'}/>
//             }
//             return <Component {...this.props}/>
//         }
//     }
//     return connect(mapStateToProps)(withRedirect)
// }

// Функциональный HOC

export const withAuthRedirect = (Component: ComponentType) => {
    const withRedirect = (props: any) => {
        // debugger
        if (!props.isAuth) {
            return <Navigate to={'/login'}/>
        }
        return <Component {...props}/>
    }
    return connect(mapStateToProps)(withRedirect)
}