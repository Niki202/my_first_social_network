
import {ADD_POST_actionCreator, UPDATE_NEW_TEXT_POST_actionCreator} from "../../Redux/Posts-reducer";
import Profile from "./Profile";
import {connect} from "react-redux";

// const ProfileContainer = (props) => {
//
//     const addPost = () => {
//         const action = ADD_POST_actionCreator()
//         props.store.dispatch(action)
//     }
//
//     const changeNewPost = (text) => {
//         const action = UPDATE_NEW_TEXT_POST_actionCreator(text)
//         props.store.dispatch(action)
//     }
//
//     return <Profile changeNewPost={changeNewPost}
//                     addPost={addPost}
//                     newPostText={props.store.getState().myPostPage.newPostText}
//                     posts={props.store.getState().myPostPage.posts}/>
// }

const mapStateToProps = (state) => {
  return({
      newPostText: state.myPostPage.newPostText,
      posts: state.myPostPage.posts
  })
}

const mapDispatchToProps = (dispatch) => {
    return({
        addPost: () => {dispatch(ADD_POST_actionCreator())},
        changeNewPost: (text) => {dispatch(UPDATE_NEW_TEXT_POST_actionCreator(text))}
    })
}

const ProfileContainer = connect(mapStateToProps, mapDispatchToProps)(Profile)

export default ProfileContainer