import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  makeStyles,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import MyDrawer from "./MyDrawer";

const useStyles = makeStyles((theme) => ({
  navlinks: {
    // marginLeft: theme.spacing(5),
    display: "flex",
  },
  logo: {
    flexGrow: "1",
    cursor: "pointer",
  },
  link: {
    textDecoration: "none",
    color: "white",
    fontSize: "1.3rem",
    "&:hover": {
      color: "white",
      borderBottom: "1px solid white",
    },
  },
  activeLink: {
    color: "white",
    borderBottom: "2px solid white",
    fontSize: "1.3rem",
  },
  navbar: {
    background: "black",
    position: "absolute",
    zIndex: 999,
    "padding-left": "30px",
    "padding-right": "30px",
    display: "flex",
    "justify-content": "space-between",
  },
}));

function MyNav() {
  useEffect(() => {
    var myPath = window.location.href;
    var myUrl = myPath.substring(myPath.lastIndexOf("/") + 1);
    setIsActive(myUrl);
  }, []);
  const [isActive, setIsActive] = useState();
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <AppBar position='static'>
      <CssBaseline />
      <Toolbar className={`${classes.navbar} w-full pt-6 pb-6 vmd-navbar`}>
        {isMobile ? (
          <MyDrawer />
        ) : (
          <>
            <div className=''>
              <img src='/assets/logoWhite.svg' />
            </div>
            <div className={`flex place-content-end w-full mr-10 gap-16`}>
              <Link
                to='/'
                className={
                  isActive == "home" ? classes.activeLink : classes.link
                }
                onClick={() => {
                  setIsActive("home");
                }}
              >
                Home
              </Link>
              <Link
                onClick={() => {
                  setIsActive("contact");
                }}
                to='/contact-us'
                className={
                  isActive == "contact" ? classes.activeLink : classes.link
                }
              >
                Contact Us
              </Link>
              <Link
                onClick={() => {
                  setIsActive("login");
                }}
                to='/login'
                className={
                  isActive == "login" ? classes.activeLink : classes.link
                }
              >
                Login
              </Link>
              <Link
                onClick={() => {
                  setIsActive("signup");
                }}
                to='/signup'
                className={
                  isActive == "signup" ? classes.activeLink : classes.link
                }
              >
                Sign Up
              </Link>
            </div>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
export default MyNav;
