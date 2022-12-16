import classes from './Profile.module.css'
import MyPosts from './MyPosts/MyPosts'
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {addPost, changeNewPost, getProfile} from "../../Redux/Profile-reducer";
import {connect} from "react-redux";
import React from "react";
import {useLocation, useNavigate, useParams} from 'react-router-dom'
import {Preloader} from "../Common/Preloader/Preloader";

class Profile extends React.Component {

    componentDidMount() {
        this.props.getProfile(this.props.router.params.userId)
    }


    render() {
        return (
            <>
                {this.props.isFetchingProfile
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
    return (props) => {
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
}

const mapStateToProps = (state) => {
    return({
        newPostText: state.myPostPage.newPostText,
        posts: state.myPostPage.posts,
        profileInfo: state.myPostPage.profileInfo,
        isFetchingProfile: state.myPostPage.isFetchingProfile,
    })
}

const mapDispatchToProps = {addPost, changeNewPost, getProfile}


const ProfileContainer = connect(mapStateToProps, mapDispatchToProps)(withRouter(Profile))

export default ProfileContainer