import classes from './Profile.module.css'
import MyPosts from './MyPosts/MyPosts'
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {GET_POSTS_actionCreator} from "../../Redux/Posts-reducer";

const Profile = (props) => {
    return (
        <div className={classes.content}>
            <ProfileInfo changeNewPost={props.changeNewPost}
                         addPost={props.addPost}
                         newPostText={props.newPostText}/>
            <MyPosts posts={props.posts}/>
        </div>
)
}

export default Profile