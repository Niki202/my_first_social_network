import classes from './Message.module.css'


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
        props.setNewTextMessage(text_value)
    }
    const addMessage = () => {
        props.addMessage(props.userId)
        document.getElementById('input_message').value = ''
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