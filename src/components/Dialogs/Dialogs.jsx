import classes from './Dialogs.module.css'
import {NavLink} from "react-router-dom";

const activeClassName = (className) => className.isActive ? classes.active : undefined

const Dialog = (props) => {
  return(
      <div className={`${classes.dialog} ${classes.active}`}>
          <NavLink className={activeClassName} to={`/dialogs/${props.id}`}>{props.name}</NavLink>
      </div>
  )
}

const Message = (props) => {
  return(
      <div>
          <div className={classes.message}>{props.message}</div>
      </div>
  )
}

const Dialogs = () => {
  return(
      <div className={classes.dialogs}>
          <div className={classes.dialogsItems}>
              <Dialog id={'1'} name={'Dimych'}/>
              <Dialog id={'2'} name={'Sveta'}/>
              <Dialog id={'3'} name={'Valera'}/>
              <Dialog id={'4'} name={'Andrey'}/>
          </div>
          <div className={classes.messages}>
              <Message message={'Hello!'}/>
              <Message message={'How are you?'}/>
              <Message message={'I\'m fine!'}/>
          </div>
      </div>
  )
}

export default Dialogs