import classes from './Status.module.css'
import React, {FC, useEffect, useState} from "react";

type OwnPropsType = {
    isOwner: boolean
    updateMyStatus: (status: string) => void
    status: string
}

export const Status: FC<OwnPropsType> = ({isOwner, ...props}) => {
    const [statusEditMode, toggleStatusEditMode] = useState(false)
    const [status, setStatus] = useState(props.status)

    const updateStatus = () => {
        props.updateMyStatus(status)
        toggleStatusEditMode(false)
    }
    const onKeyDownEnter = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            updateStatus()
        }
    }

    const onChangeStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStatus(e.target.value)
    }

    const onDoubleClickStatus = () => {
        if (isOwner) {
            toggleStatusEditMode(true)
        }
    }

    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

    return(
        <div className={classes.status}>
            {!statusEditMode
                ? <span onDoubleClick={onDoubleClickStatus}>{props.status
                    ? props.status
                    : 'No status'}</span>
                : <input onBlur={updateStatus}
                         onKeyDown={onKeyDownEnter}
                         onChange={onChangeStatus}
                         defaultValue={status}
                         autoFocus={true}/>}
        </div>
    )
}