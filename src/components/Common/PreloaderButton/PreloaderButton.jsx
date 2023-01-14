import React from "react";
import preloader from "../../../assets/images/PreloaderButton.svg";
import classes from "./PreloaderButton.module.css"

export const PreloaderButton = () => {
  return(
      <div className={classes.wrapper}>
        <img width='18' height='18' src={preloader} alt="Loading..."/>
      </div>
  )
}