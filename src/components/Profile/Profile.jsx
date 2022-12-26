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

    constructor(props) {
        super(props);
        this.state = {
            statusEditMode: false,
            status: this.props.status
        }
    }

    componentDidMount() {
        this.props.getProfile(this.props.router.params.userId)
        this.props.getUserStatus(this.props.router.params.userId)
    }


    changeStateStatus = (event) => {
        this.setState({status: event.target.value})
    }


    toggleStatusEditMode = (userId) => {
        const statusEditMode = this.state.statusEditMode
        if (statusEditMode) {
            this.setState({statusEditMode: false})
            this.props.updateMyStatus(this.state.status)

        } else {
            if (+userId === this.props.myId) {
                this.setState({statusEditMode: true})
            }
        }
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
                                     stateStatus={this.state.status}
                                     getUserStatus={this.props.getUserStatus}
                                     userId={this.props.router.params.userId}
                                     statusEditMode={this.state.statusEditMode}
                                     toggleStatusEditMode={this.toggleStatusEditMode}
                                     changeStateStatus={this.changeStateStatus}
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