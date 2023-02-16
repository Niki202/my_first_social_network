import classes from './Profile.module.css'
import MyPosts from './MyPosts/MyPosts'
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {addPost, getProfile, updateMyStatus} from "../../Redux/Profile-reducer";
import {connect} from "react-redux";
import React from "react";
import {Preloader} from "../Common/Preloader/Preloader";
import {withAuthRedirect} from "../../HOC/withAuthRedirect";
import {withRouter} from "../../HOC/withRouter";
import {compose} from "redux";
import {uploadPhoto} from "../../Redux/Profile-reducer";

class Profile extends React.Component {

    componentDidMount() {
        this.props.getProfile(this.props.router.params.userId)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (+this.props.router.params.userId !== prevProps.profileInfo.userId && !this.props.isFetchingProfile) {
            this.props.getProfile(this.props.router.params.userId)
        }
    }

    onSubmitPost = (formData, form) => {
        this.props.addPost(formData.newPostText)
        form.reset()
    }

    render() {
        return (
            <>
                {this.props.isFetchingProfile
                    ? <Preloader/>
                    : <div className={classes.content}>
                        <ProfileInfo profile={this.props.profileInfo}
                                     status={this.props.status}
                                     userId={this.props.router.params.userId}
                                     myId={this.props.myId}
                                     updateMyStatus={this.props.updateMyStatus}
                                     onSubmitPost={this.onSubmitPost}
                                     uploadPhoto={this.props.uploadPhoto}/>


                        <MyPosts posts={this.props.posts}/>
                    </div>}
            </>

        )
    }

}

const mapStateToProps = (state) => {
    return ({
        posts: state.myPostPage.posts,
        profileInfo: state.myPostPage.profileInfo,
        isFetchingProfile: state.myPostPage.isFetchingProfile,
        status: state.myPostPage.status,
        myId: state.auth.userId
    })
}

const mapDispatchToProps = {addPost, getProfile, updateMyStatus, uploadPhoto}


export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect,
    withRouter
)(Profile)