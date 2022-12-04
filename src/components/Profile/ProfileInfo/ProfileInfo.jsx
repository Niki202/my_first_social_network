import classes from './ProfileInfo.module.css'
import avaImage from '../../../assets/images/Ava.webp'

const ProfileInfo = (props) => {
    const addPost = () => {
        props.addPost()
    }

    const changeNewPost = (event) => {
        const text = event.target.value
        props.changeNewPost(text)
    }

    return (
        <>
            <div className={classes.pictWrapper}>
                <img className={classes.img} src='https://99px.ru/sstorage/53/2021/09/mid_333252_961881.jpg'
                     alt="logo"/>
            </div>
            <div className={classes.info}>
                <div className={classes.profile_descriptions}>
                    <div className={classes.avatar_wrapper}>
                        <img src={props.profile.photos.large === null
                            ? avaImage
                            : props.profile.photos.large} alt="avatar"/>
                    </div>
                    <div className={classes.text}>
                        <div className={classes.name}>
                            {props.profile.fullName}
                        </div>
                        <div className={classes.about}>
                            {props.profile.aboutMe}
                        </div>
                        <div className={classes.job}>
                            <span className={props.profile.lookingForAJob ? classes.jobTrue : classes.jobFalse}>
                                {props.profile.lookingForAJob ? 'Ищу работу: ' + props.profile.lookingForAJobDescription : 'Не ищу работу'}
                            </span>
                        </div>
                    </div>
                </div>
                <div>My posts</div>
                <div>
                    <textarea value={props.newPostText} onChange={changeNewPost}/>
                </div>
                <div>
                    <button className={classes.button}
                            onClick={addPost}>Add post
                    </button>
                </div>
            </div>
        </>
    )
}
export default ProfileInfo