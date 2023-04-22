import Post from "./Post/Post";
import {PostType} from "../../../Types/Types";
import {FC} from "react";

type OwnPropsType = {
    posts: Array<PostType>
}



const MyPosts: FC<OwnPropsType> = (props) => {
    const posts = props.posts
        .map(post => <Post key={post.id} message={post.post} likesCount={post.likesCount}/>)
  return(
      <>
          {posts}
      </>
  )
}

export default MyPosts