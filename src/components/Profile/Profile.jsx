import {GET_POSTS_actionCreator} from "../../Redux/store";

import classes from './Profile.module.css'
import MyPosts from './MyPosts/MyPosts'
import ProfileInfo from "./ProfileInfo/ProfileInfo";

const Profile = (props) => {
    return (
        <div className={classes.content}>
            <ProfileInfo store={props.store}/>
            <MyPosts posts={props.store.dispatch(GET_POSTS_actionCreator())}/>
        </div>
)
}

export default Profile