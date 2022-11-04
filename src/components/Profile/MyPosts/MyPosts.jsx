import Post from "./Post/Post";



const MyPosts = (props) => {
    const posts = props.posts.map(post => <Post key={post.id} message={post.post} likesCount={post.likesCount}/>)
  return(
      <>
          {posts}
      </>
  )
}

export default MyPosts