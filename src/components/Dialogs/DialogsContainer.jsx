import Dialogs from "./Dialogs";
import {ADD_MESSAGE_actionCreator, UPDATE_NEW_MESSAGE_TEXT_actionCreator} from "../../Redux/Dialogs-reducer";




// const DialogsContainer = (props) => {
//
//   const setNewTextMessage = (text) => {
//     props.store.dispatch(UPDATE_NEW_MESSAGE_TEXT_actionCreator(text))
//   }
//
//   const addMessage = (userId) => {
//     props.store.dispatch(ADD_MESSAGE_actionCreator(userId))
//   }
//
//   return <Dialogs dialogs={props.store.getState().dialogsPage.dialogs}
//                   messages={props.store.getState().dialogsPage.messages}
//                   newMessagetext={props.store.getState().dialogsPage.newMessageText}
//                   setNewTextMessage={setNewTextMessage}
//                   addMessage={addMessage}/>
// }

const DialogsContainer = (state) => {
  return({

  })
}

export default DialogsContainer