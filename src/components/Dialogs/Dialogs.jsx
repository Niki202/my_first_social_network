import classes from './Dialogs.module.css'
import Dialog from "./Dialog/Dialog";
import Message from "./Message/Message";
import {Route, Routes} from "react-router-dom";
import {withAuthRedirect} from "../../HOC/withAuthRedirect";




const Dialogs = (props) => {
    const dialogs = props.dialogs.map(dialog =>
        <Dialog key={dialog.id} id={dialog.id} name={dialog.name}/>)

    const messages = props.messages.map(userMessages => {
           return <Route path={userMessages.userId.toString()}
                         key={userMessages.userId}
                         element={<Message messages={userMessages.userMessages}
                                           userId={userMessages.userId}
                                           newTextMessage={props.newMessageText}
                                           dispatch={props.dispatch}
                                           setNewTextMessage={props.setNewTextMessage}
                                           addMessage={props.addMessage}/>}/>
        }
    )
    // if (!props.isAuth) {
    //     return <Navigate to={'/login'}/>
    // }

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

export default withAuthRedirect(Dialogs)