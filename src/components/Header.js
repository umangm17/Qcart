import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Search, SentimentDissatisfied } from "@mui/icons-material";
import { Avatar, Button, Stack ,TextField,} from "@mui/material";
import { useHistory } from "react-router-dom";
import Box from "@mui/material/Box";
import React, { useState ,useEffect} from "react";
import "./Header.css";

const Header = ({ children, hasHiddenAuthButtons }) => {
  // console.log(hasHiddenAuthButtons)
  const history = useHistory();
  // let userData;
 
 const  userData = localStorage.getItem("username");

  
  const userLogout = () => {
    localStorage.clear();
    history.push("/login");
    window.location.reload();
  };
  
  
  return (
    <Box className="header">
      <Box className="header-title">
        <img
          src="logo_light.svg"
          alt="QKart-icon"
          onClick={() => history.push("/")}
        ></img>

      </Box>
      {children}
      
      {hasHiddenAuthButtons && (
        <Button
          className="explore-button"
          startIcon={<ArrowBackIcon />}
          variant="text"
          onClick={() => history.push("/")}
        >
          Back to explore
        </Button>
      )}
      {!hasHiddenAuthButtons && (
        <>
          {!localStorage.getItem("username") ? (
            <div className="item">
              <Button variant="text" onClick={() => history.push("/login")} >
                Login
              </Button>
              <Button
                variant="contained"
                onClick={() => history.push("/register")}
              >
                Register
              </Button>
            </div>
          ) : (
            <div className="item">
              <Avatar
                src="avatar.png"
                alt={userData}
                sx={{ mr: 1 }}
              />
              {localStorage.getItem("username")}
              <Button  variant="text"  onClick={userLogout} >
                Logout
              </Button>
            </div>
          )}
        </>
      )}
    </Box>
  );
};

export default Header;
