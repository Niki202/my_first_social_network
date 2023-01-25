import React from "react";
import {connect} from "react-redux";
import {Navigate} from "react-router-dom";

const mapStateToProps = (state) => ({
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

export const withAuthRedirect = (Component) => {
    const withRedirect = (props) => {
        // debugger
        if (!props.isAuth) {
            return <Navigate to={'/login'}/>
        }
        return <Component {...props}/>
    }
    return connect(mapStateToProps)(withRedirect)
}