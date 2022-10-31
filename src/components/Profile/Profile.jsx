import classes from './Profile.module.css'
import Post from './Post/Post'
import { NavLink } from "react-router-dom";

const Profile = () => {
  return(
      <div className={classes.content}>
        <div className={classes.pictWrapper}>
            <img className={classes.img} src='https://99px.ru/sstorage/53/2021/09/mid_333252_961881.jpg' alt="logo"/>
        </div>
        <div>ava + descriptions</div>
        <div>My posts</div>
        <div>New posts</div>
        <Post message='Hello React!'/>
        <Post message='This is my first social network!!!'/>
      </div>
  )
}
export default Profile