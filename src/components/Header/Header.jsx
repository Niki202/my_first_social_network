import logo from "../../assets/images/Logo.svg";
import classes from "./Header.module.css";

const Header = () => {
  return(
      <header className={classes.header}>
        <img width='100' height='100' src={logo} alt="logo"/>

      </header>
  )
}
export default Header