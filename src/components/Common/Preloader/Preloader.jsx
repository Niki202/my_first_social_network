import React from "react";
import preloader from "../../../assets/images/Preloader.svg";
import classes from "./Preloader.module.css"

export const Preloader = () => {
  return(
      <div className={classes.wrapper}>
        <img width='70' height='70' src={preloader} alt="Loading..."/>
      </div>
  )
}