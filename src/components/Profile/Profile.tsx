import classes from './Profile.module.css'
import MyPosts from './MyPosts/MyPosts'
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {addPost, getProfile, updateMyStatus, uploadProfile} from "../../Redux/Profile-reducer";
import {connect} from "react-redux";
import React from "react";
import {Preloader} from "../Common/Preloader/Preloader";
import {withAuthRedirect} from "../../HOC/withAuthRedirect";
import {withRouter} from "../../HOC/withRouter";
import {compose} from "redux";
import {uploadPhoto} from "../../Redux/Profile-reducer";
import {RootStateType} from "../../Redux/redux-store";
import {PostType, ProfileInfoType, ProfileType} from "../../Types/Types";
import {FormApi} from "final-form";

type MapStatePropsType = {
    posts: Array<PostType>,
    profileInfo: ProfileInfoType,
    isFetchingProfile: boolean,
    status: string,
    myId: number | null
}
type MapDispatchPropsType = {
    addPost: (newPostText: string) => void,
    getProfile: (userId: number) => void,
    updateMyStatus: (status: string) => void,
    uploadPhoto: (file: File) => void,
    uploadProfile: (profile: ProfileType) => Promise<any>
}

type RouteComponentPropsType = {
    router: {params: {userId: number}}
}

class Profile extends React.Component<MapStatePropsType & MapDispatchPropsType & RouteComponentPropsType> {

    componentDidMount() {
        this.props.getProfile(this.props.router.params.userId)
    }

    componentDidUpdate(prevProps: MapStatePropsType & MapDispatchPropsType, prevState:RootStateType, snapshot: any) {
        if (+this.props.router.params.userId !== prevProps.profileInfo.userId && !this.props.isFetchingProfile) {
            this.props.getProfile(this.props.router.params.userId)
        }
    }

    onSubmitPost = (formData: {newPostText: string}, form?: FormApi) => {
        this.props.addPost(formData.newPostText)
        if (form) form.reset()
    }

    render() {
        return (
            <>
                {this.props.isFetchingProfile
                    ? <Preloader/>
                    : <div>
                        <ProfileInfo profile={this.props.profileInfo}
                                     status={this.props.status}
                                     userId={this.props.router.params.userId}
                                     myId={this.props.myId}
                                     updateMyStatus={this.props.updateMyStatus}
                                     onSubmitPost={this.onSubmitPost}
                                     uploadPhoto={this.props.uploadPhoto}
                                     uploadProfile={this.props.uploadProfile}/>


                        <MyPosts posts={this.props.posts}/>
                    </div>}
            </>

        )
    }

}

const mapStateToProps = (state: RootStateType) => {
    return ({
        posts: state.myPostPage.posts,
        profileInfo: state.myPostPage.profileInfo,
        isFetchingProfile: state.myPostPage.isFetchingProfile,
        status: state.myPostPage.status,
        myId: state.auth.userId
    })
}

const mapDispatchToProps = {addPost, getProfile, updateMyStatus, uploadPhoto, uploadProfile}


export default compose<React.ComponentType>(
    connect<MapStatePropsType, any, unknown, RootStateType>(mapStateToProps, mapDispatchToProps),
    withAuthRedirect,
    withRouter
)(Profile)