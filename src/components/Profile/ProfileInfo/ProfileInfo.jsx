import classes from './ProfileInfo.module.css'

const ProfileInfo = (props) => {
    const addPost = () => {
        props.addPost()
    }

    const changeNewPost = (event) => {
        // debugger
        const text = event.target.value
        // const text = document.getElementsByTagName("textarea")[0].value
        props.changeNewPost(text)
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