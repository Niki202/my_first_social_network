import {
    UPDATE_NEW_TEXT_POST_actionCreator,
    ADD_POST_actionCreator,
    GET_NEW_TEXT_POST_actionCreator,
} from "../../../Redux/store";

import classes from './ProfileInfo.module.css'


const ProfileInfo = (props) => {
    const addPost = () => {
        const action = ADD_POST_actionCreator()
        props.store.dispatch(action)
    }

    const changeNewPost = () => {
        // debugger
        const text = document.getElementsByTagName("textarea")[0].value
        const action = UPDATE_NEW_TEXT_POST_actionCreator(text)
        props.store.dispatch(action)
    }

    return (
        <>
            <div className={classes.pictWrapper}>
                <img className={classes.img} src='https://99px.ru/sstorage/53/2021/09/mid_333252_961881.jpg'
                     alt="logo"/>
            </div>
            <div className={classes.info}>
                <div>ava + descriptions</div>
                <div>My posts</div>
                <div>
                    <textarea value={props.store.dispatch(GET_NEW_TEXT_POST_actionCreator())} onChange={changeNewPost}/>
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