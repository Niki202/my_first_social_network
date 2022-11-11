import classes from './Profile.module.css'
import MyPosts from './MyPosts/MyPosts'
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {GET_POSTS_actionCreator} from "../../Redux/Posts-reducer";

const Profile = (props) => {
    return (
        <div className={classes.content}>
            <ProfileInfo dispatch={props.dispatch}
                         newPostText={props.myPostPage.newPostText}/>
            <MyPosts posts={props.myPostPage.posts}/>
        </div>
)
}

export default Profile