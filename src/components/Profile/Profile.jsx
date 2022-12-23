import classes from './Profile.module.css'
import MyPosts from './MyPosts/MyPosts'
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {addPost, changeNewPost, getProfile, getUserStatus, updateMyStatus} from "../../Redux/Profile-reducer";
import {connect} from "react-redux";
import React from "react";
import {Preloader} from "../Common/Preloader/Preloader";
import {withAuthRedirect} from "../../HOC/withAuthRedirect";
import {withRouter} from "../../HOC/withRouter";

class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {statusEditMode: false,
        status: this.props.status}
    }

    componentDidMount() {
        this.props.getProfile(this.props.router.params.userId)
        this.props.getUserStatus(this.props.router.params.userId)
    }

    addPost = () => {
        this.props.addPost()
    }

    changeStateStatus = (event) => {
        this.setState({status: event.target.value})
    }

    changeNewPost = (event) => {
        const text = event.target.value
        this.props.changeNewPost(text)
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

    render() {
        return (
            <>
                {this.props.isFetchingProfile
                    ? <Preloader/>
                    : <div className={classes.content}>
                        <ProfileInfo changeNewPost={this.changeNewPost}
                                     addPost={this.addPost}
                                     newPostText={this.props.newPostText}
                                     profile={this.props.profileInfo}
                                     status={this.props.status}
                                     stateStatus={this.state.status}
                                     getUserStatus={this.props.getUserStatus}
                                     userId={this.props.router.params.userId}
                                     statusEditMode={this.state.statusEditMode}
                                     toggleStatusEditMode={this.toggleStatusEditMode}
                                     changeStateStatus={this.changeStateStatus}/>


                        <MyPosts posts={this.props.posts}/>
                    </div>}
            </>

        )
    }

}

const mapStateToProps = (state) => {
    return ({
        newPostText: state.myPostPage.newPostText,
        posts: state.myPostPage.posts,
        profileInfo: state.myPostPage.profileInfo,
        isFetchingProfile: state.myPostPage.isFetchingProfile,
        status: state.myPostPage.status,
        myId: state.auth.userId
    })
}

const mapDispatchToProps = {addPost, changeNewPost, getProfile, getUserStatus, updateMyStatus}


const ProfileContainer = connect(mapStateToProps, mapDispatchToProps)(withRouter(Profile))

export default withAuthRedirect(ProfileContainer)