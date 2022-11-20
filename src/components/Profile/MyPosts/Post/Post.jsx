import classes from './Post.module.css'
import ava from '../../../../assets/images/Ava.webp'

const Post = (props) => {

    return (
        <div className={classes.postWrapper}>
            <img className={classes.img} width='50' height='50'
                 src={ava}
                 alt="avatar"/>
            <span className={classes.text}>{props.message}</span>
            <div>Likes: {props.likesCount}</div>
        </div>
    )
}

export default Post