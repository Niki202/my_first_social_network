import classes from './Dialogs.module.css'
import Dialog from "./Dialog/Dialog";
import Message from "./Message/Message";
import {Route, Routes} from "react-router-dom";
import {withAuthRedirect} from "../../HOC/withAuthRedirect";
import {addMessage} from "../../Redux/Dialogs-reducer";
import {connect} from "react-redux";
import {compose} from "redux";




const Dialogs = (props) => {
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

const mapStateToProps = (state) => {
    return({
        dialogs: state.dialogsPage.dialogs,
        messages: state.dialogsPage.messages,
    })
}

// Compose компонует целевой компонент с разными хоками

export default compose(
    // Функция connect возвращает hoc
    connect(mapStateToProps, {addMessage}),
    withAuthRedirect
)(Dialogs)