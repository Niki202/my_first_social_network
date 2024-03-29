import classes from './Profile.module.css'
import MyPosts from './MyPosts/MyPosts'
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {addPost, getProfile, getUserStatus, updateMyStatus} from "../../Redux/Profile-reducer";
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

    onSubmitPost = (formData) => {
        this.props.addPost(formData.newPostText)
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
                                     onSubmitPost={this.onSubmitPost}/>


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

const mapDispatchToProps = {addPost, getProfile, getUserStatus, updateMyStatus}


export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect,
    withRouter
)(Profile)