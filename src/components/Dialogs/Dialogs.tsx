import classes from './Dialogs.module.css'
import Dialog from "./Dialog/Dialog";
import Message from "./Message/Message";
import {Route, Routes} from "react-router-dom";
import {withAuthRedirect} from "../../HOC/withAuthRedirect";
import {addMessage, AddMessageActionCreatorType} from "../../Redux/Dialogs-reducer";
import {connect} from "react-redux";
import {compose} from "redux";
import {FC} from "react";
import {RootStateType} from "../../Redux/redux-store";
import {DialogType, UserMessagesType} from "../../Types/Types";

type MapStatePropsType = {
    dialogs: Array<DialogType>,
    messages: Array<UserMessagesType>
}

type MapDispatchPropsType = {
    addMessage: AddMessageActionCreatorType
}


const Dialogs: FC<MapStatePropsType & MapDispatchPropsType> = (props) => {
    const dialogs = props.dialogs.map(dialog =>
        <Dialog key={dialog.id} id={dialog.id} name={dialog.name}/>)

    const messages = props.messages.map(userMessages => {
           return <Route path={userMessages.userId.toString()}
                         key={userMessages.userId}
                         element={<Message messages={userMessages.userMessages}
                                           userId={userMessages.userId}
                                           addMessage={props.addMessage}/>}/>
        }
    )

  return(
      <div className={classes.dialogs}>
          <div className={classes.dialogsItems}>
              {dialogs}
          </div>
          <div className={classes.messages}>
              <Routes>
                  {messages}
              </Routes>
          </div>
      </div>
  )
}

const mapStateToProps = (state: RootStateType):MapStatePropsType => {
    return({
        dialogs: state.dialogsPage.dialogs,
        messages: state.dialogsPage.messages,
    })
}

// Compose компонует целевой компонент с разными хоками

export default compose<any>(
    // Функция connect возвращает hoc
    connect<MapStatePropsType, MapDispatchPropsType, unknown, RootStateType>(mapStateToProps, {addMessage}),
    withAuthRedirect
)(Dialogs)