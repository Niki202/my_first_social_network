import classes from './Message.module.css'
import {UPDATE_NEW_MESSAGE_TEXT_actionCreator, ADD_MESSAGE_actionCreator} from "../../../Redux/store";


const Message = (props) => {
    // debugger
    const messages = props.messages.map(message => {
        return(
            <div key={message.id.toString()}>
                <div className={classes.message}>{message.message}</div>
            </div>
        )
    })
    const setNewTextMessage = () => {
        const text_value = document.getElementById("input_message").value
        props.dispatch(UPDATE_NEW_MESSAGE_TEXT_actionCreator(text_value))
    }
    const addMessage = () => {
        props.dispatch(ADD_MESSAGE_actionCreator(props.userId))
    }

  return(
      <div className={classes.messageList}>
          <div className={classes.messages}>
              {messages}
          </div>
          <div className={classes.sendMessage}>
              <input id='input_message' type="text"
                     value={props.newTextMessage}
                     placeholder='Enter your message...'
                     onChange={setNewTextMessage}
                  />
              <button className={classes.button} onClick={addMessage}>Send</button>
          </div>
      </div>
  )
}


export default Message