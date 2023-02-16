import React from "react";
import preloader from "../../../assets/images/PreloaderButton.svg";
import classes from "./PreloaderButton.module.css"

export const PreloaderButton = ({className, ...props}) => {
  return(
      <div className={`${classes.wrapper} ${className && className}`}>
        <img width='18' height='18' src={preloader} alt="Loading..."/>
      </div>
  )
}