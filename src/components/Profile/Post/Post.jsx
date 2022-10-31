import classes from './Post.module.css'

const Post = (props) => {

  return(
      <div className={classes.postWrapper}>
          <img className={classes.img} width='50' height='50' src="https://img.freepik.com/premium-psd/3d-cartoon-character-avatar-isolated-3d-rendering_235528-540.jpg" alt="avatar"/>
       <span className={classes.text}>{props.message}</span>
      </div>
  )
}

export default Post