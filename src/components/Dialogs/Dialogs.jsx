import classes from './Dialogs.module.css'
import Dialog from "./Dialog/Dialog";
import Message from "./Message/Message";




const Dialogs = (props) => {
    // debugger;
    const dialogs = props.dialogs.map(dialog =>
        <Dialog key={dialog.id.toString()} id={dialog.id} name={dialog.name}/>)

    const messages = props.messages.map(message =>
        <Message key={message.id.toString()} message={message.message}/>)

  return(
      <div className={classes.dialogs}>
          <div className={classes.dialogsItems}>
              {dialogs}
          </div>
          <div className={classes.messages}>
              {messages}
          </div>
      </div>
  )
}

export default Dialogs