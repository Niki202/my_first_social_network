import classes from './Profile.module.css'
import MyPosts from './MyPosts/MyPosts'
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {addPost, changeNewPost, setProfile} from "../../Redux/ProfileReducer";
import {connect} from "react-redux";
import React from "react";
import axios from "axios";
import {useLocation, useNavigate, useParams} from 'react-router-dom'
import {setIsFetching} from "../../Redux/Users-reducer";
import {Preloader} from "../Common/Preloader/Preloader";


class Profile extends React.Component {

    componentDidMount() {
        const userId = this.props.router.params.userId
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`).then(response => {
            this.props.setProfile(response.data)
            this.props.setIsFetching(false)
            console.log(this.props)
        })

    }

    render() {
        return (
            <>
                {this.props.isFetching
                    ? <Preloader/>
                    : <div className={classes.content}>
                        <ProfileInfo changeNewPost={this.props.changeNewPost}
                                     addPost={this.props.addPost}
                                     newPostText={this.props.newPostText}
                                     profile={this.props.profileInfo}/>
                        <MyPosts posts={this.props.posts}/>
                    </div>}
            </>

        )
    }

}
// Функция обертка для добавления параметров route
function withRouter(Component) {
    function ComponentWithRouterProp(props) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return (
            <Component
                {...props}
                router={{ location, navigate, params }}
            />
        );
    }

    return ComponentWithRouterProp;
}

const mapStateToProps = (state) => {
    return({
        newPostText: state.myPostPage.newPostText,
        posts: state.myPostPage.posts,
        profileInfo: state.myPostPage.profileInfo,
        isFetching: state.myPostPage.isFetching,
    })
}

const mapDispatchToProps = {addPost, changeNewPost, setProfile, setIsFetching}


const ProfileContainer = connect(mapStateToProps, mapDispatchToProps)(withRouter(Profile))

export default ProfileContainer