import classes from './Profile.module.css'
import MyPosts from './MyPosts/MyPosts'
import ProfileInfo from "./ProfileInfo/ProfileInfo";

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