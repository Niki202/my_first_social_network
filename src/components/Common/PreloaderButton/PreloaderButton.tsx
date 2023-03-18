import React, {FC} from "react";
import preloader from "../../../assets/images/PreloaderButton.svg";
import classes from "./PreloaderButton.module.css"

type PropsType = {
    className?: string
}

export const PreloaderButton: FC<PropsType> = ({className}) => {
  return(
      <div className={`${classes.wrapper} ${className && className}`}>
        <img width='18' height='18' src={preloader} alt="Loading..."/>
      </div>
  )
}