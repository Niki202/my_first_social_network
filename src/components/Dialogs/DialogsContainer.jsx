import Dialogs from "./Dialogs";
import {ADD_MESSAGE_actionCreator, UPDATE_NEW_MESSAGE_TEXT_actionCreator} from "../../Redux/Dialogs-reducer";
import {connect} from "react-redux";



const mapStateToProps = (state) => {
  return({
    dialogs: state.dialogsPage.dialogs,
    messages: state.dialogsPage.messages,
    newMessageText: state.dialogsPage.newMessageText
  })
}

const mapDispatchToProps = (dispatch) => {
  return({
    setNewTextMessage: (text) => {
      dispatch(UPDATE_NEW_MESSAGE_TEXT_actionCreator(text))
    },
    addMessage: (userId) => {
      dispatch(ADD_MESSAGE_actionCreator(userId))
    }
  })
}

const DialogsContainer = connect(mapStateToProps,mapDispatchToProps)(Dialogs)


export default DialogsContainer