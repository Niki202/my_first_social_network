import classes from './Profile.module.css'
import MyPosts from './MyPosts/MyPosts'
import ProfileInfo from "./ProfileInfo/ProfileInfo";

const Profile = (props) => {
    return (
        <div className={classes.content}>
            <ProfileInfo myPostPage={props.myPostPage}/>
            <MyPosts posts={props.myPostPage.posts}/>
        </div>
)
}

export default Profile