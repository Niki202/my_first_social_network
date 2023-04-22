import classes from './AvatarContainer.module.css'
import avaImage from "../../../../assets/images/Ava.webp";
import React, {FC, useState} from "react";
import {PhotosType} from "../../../../Types/Types";

// Types
// Props types
type OwnPropsTypes = {
    photos: PhotosType
    isOwner: boolean
    profileEditMode: boolean
    uploadPhoto: (file: any) => void
}

export const AvatarContainer: FC<OwnPropsTypes> = ({photos, isOwner, profileEditMode, ...props}) => {

    const [fileName, setFileName] = useState('Select file')
    const [file, setFile] = useState(null)

    const savePhoto = (e: React.ChangeEvent<any>) => {
        const file = e.target.files[0]
        setFile(file)
        setFileName(file.name)
    }
    const sendPhoto = () => {
        console.log(file)
        props.uploadPhoto(file)
        const input = document.getElementById('fileInput') as HTMLInputElement
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