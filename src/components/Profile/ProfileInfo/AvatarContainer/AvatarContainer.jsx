import classes from './AvatarContainer.module.css'
import avaImage from "../../../../assets/images/Ava.webp";
import React, {useState} from "react";

export const AvatarContainer = ({photos, isOwner, profileEditMode, ...props}) => {

    const [fileName, setFileName] = useState('Select file')
    const [file, setFile] = useState(null)

    const savePhoto = (e) => {
        const file = e.target.files[0]
        setFile(file)
        setFileName(file.name)
    }
    const sendPhoto = () => {
        props.uploadPhoto(file)
        const input = document.getElementById('fileInput')
        input.value = ''
    }

    return(
        <div>
            <div className={classes.avatar_wrapper}>
                <img src={photos.large || avaImage} alt="avatar"/>
            </div>
            {isOwner && profileEditMode && <div>
                <label htmlFor={'fileInput'}>{fileName}</label>
                <input className={classes.inputFile} id={'fileInput'} type={'file'}
                       accept={'image/jpeg, image/png, image/gif'} onChange={(e) => savePhoto(e)}/>
                <button disabled={!file} className={classes.button} onClick={sendPhoto}>Upload</button>
            </div>}
        </div>
    )
}