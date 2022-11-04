import classes from './ProfileInfo.module.css'


const ProfileInfo = (props) => {
    const addPost = () => {
        props.myPostPage.functions.addPost()
    }

    const changeNewPost = () => {
        const text = document.getElementsByTagName("textarea")[0].value
        debugger
        props.myPostPage.functions.changeTextArea(text)
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
                    <textarea value={props.myPostPage.newPostText} onChange={changeNewPost}/>
                </div>
                <div>
                    <button
                        onClick={addPost}>Add post
                    </button>
                </div>
            </div>
        </>
    )
}
export default ProfileInfo