import classes from './Profile.module.css'
import MyPosts from './MyPosts/MyPosts'
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {addPost, changeNewPost, setProfile} from "../../Redux/Profile-reducer";
import {connect} from "react-redux";
import React from "react";
import {useLocation, useNavigate, useParams} from 'react-router-dom'
import {setIsFetchingProfile} from "../../Redux/Profile-reducer";
import {Preloader} from "../Common/Preloader/Preloader";
import {getUserProfile} from "../../api/api";


class Profile extends React.Component {

    componentDidMount() {
        const userId = this.props.router.params.userId
        getUserProfile(userId).then(profile => {
            this.props.setProfile(profile)
            this.props.setIsFetchingProfile(false)
        })

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
        isFetchingProfile: state.myPostPage.isFetchingProfile,
    })
}

const mapDispatchToProps = {addPost, changeNewPost, setProfile, setIsFetchingProfile}


const ProfileContainer = connect(mapStateToProps, mapDispatchToProps)(withRouter(Profile))

export default ProfileContainer