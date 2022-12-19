import classes from './Profile.module.css'
import MyPosts from './MyPosts/MyPosts'
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {addPost, changeNewPost, getProfile} from "../../Redux/Profile-reducer";
import {connect} from "react-redux";
import React from "react";
import {Preloader} from "../Common/Preloader/Preloader";
import {withAuthRedirect} from "../../HOC/withAuthRedirect";
import {withRouter} from "../../HOC/withRouter";
import {compose} from "redux";

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


const mapStateToProps = (state) => {
    return({
        newPostText: state.myPostPage.newPostText,
        posts: state.myPostPage.posts,
        profileInfo: state.myPostPage.profileInfo,
        isFetchingProfile: state.myPostPage.isFetchingProfile,
    })
}


export default compose(
    connect(mapStateToProps, {addPost, changeNewPost, getProfile}),
    withRouter,
    withAuthRedirect,
)(Profile)