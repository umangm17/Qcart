// import { Info } from "@mui/icons-material";
import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { SnackbarProvider, useSnackbar } from "notistack";
import React, { useState } from "react";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import "./Register.css";
import {Link,useHistory} from "react-router-dom"

const Register = () => {
  const { enqueueSnackbar } = useSnackbar(true);
  const [loader, setLoader] = useState(0);
  const [info, setInfo] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  
  const history=useHistory()
  let moveToLoginPage=()=>{
    history.push("/login")
  }
  // let moveToProductPage=()=>{
  //   history.push("/")
  // }

  // TODO: CRIO_TASK_MODULE_REGISTER - Implement the register function
  /**
   * Definition for register handler
   * - Function to be called when the user clicks on the register button or submits the register form
   *
   * @param {{ username: string, password: string, confirmPassword: string }} formData
   *  Object with values of username, password and confirm password user entered to register
   *
   * API endpoint - "POST /auth/register"
   *
   * Example for successful response from backend for the API call:
   * HTTP 201
   * {
   *      "success": true,
   * }
   *
   * Example for failed response from backend for the API call:
   * HTTP 400
   * {
   *      "success": false,
   *      "message": "Username is already taken"
   * }
   */
  let capture = (event) => {
    let id = event.target.id;
    let value = event.target.value;
    setInfo({ ...info, [id]: value });
    // console.log(id, value);
  };
  const register = async (e) => {
    if (validateInput()) {
      setLoader(1);

      let api = `${config.endpoint}/auth/register`;
      const  updateData={
      username:info.username,
      password:info.password
    }
      // console.log(api);
      try {
        
        const res = await axios.post(api, updateData);
        // console.log(res);
        // enqueueSnackbar("Registered Sucessfully")
        setLoader(0);
        if(res.status === 201){
        enqueueSnackbar("User Registration is successful", { variant: "success" });}
        // moveToProductPage();
        moveToLoginPage();
      } catch (error) { 
        setLoader(0)
        if (error.response && error.response.status === 400) {
          enqueueSnackbar("Username is already taken", { variant: "error" });
          // moveToLoginPage();
        } else {
          enqueueSnackbar("Username is already taken", { variant: "error" });
        }
      }
    }
  };

  // TODO: CRIO_TASK_MODULE_REGISTER - Implement user input validation logic
  /**
   * Validate the input values so that any bad or illegal values are not passed to the backend.
   *
   * @param {{ username: string, password: string, confirmPassword: string }} data
   *  Object with values of username, password and confirm password user entered to register
   *
   * @returns {boolean}
   *    Whether validation has passed or not
   *
   * Return false if any validation condition fails, otherwise return true.
   * (NOTE: The error messages to be shown for each of these cases, are given with them)
   * -    Check that username field is not an empty value - "Username is a required field"
   * -    Check that username field is not less than 6 characters in length - "Username must be at least 6 characters"
   * -    Check that password field is not an empty value - "Password is a required field"
   * -    Check that password field is not less than 6 characters in length - "Password must be at least 6 characters"
   * -    Check that confirmPassword field has the same value as password field - Passwords do not match
   */

  const validateInput = () => {
    if (info.username === "") {
      enqueueSnackbar("Username is a required field", { variant: "warning" });
      return false;
    } else if (info.username.length < 6) {
      enqueueSnackbar("Username must be at least 6 characters", {
        variant: "warning",
      });
      return false;
    } else if (info.username.length < 6) {
      enqueueSnackbar("Username must be at least 6 characters", {
        variant: "warning",
      });
      return false;
    } else if (info.password === "") {
      enqueueSnackbar("Password is a required field", { variant: "warning" });
      return false;
    } else if (info.password.length < 6) {
      enqueueSnackbar("Password must be at least 6 characters", {
        variant: "warning",
      });
      return false;
    } else if (info.password !== info.confirmPassword) {
      enqueueSnackbar("Passwords do not match", { variant: "warning" });
      return false;
    } else {
      return true;
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      minHeight="100vh"
    >
      <Header hasHiddenAuthButtons />
      <Box className="content">
        <Stack spacing={2} className="form">
          <h2 className="title">Register</h2>
          <TextField
            id="username"
            label="Username"
            variant="outlined"
            title="Username"
            name="username"
            value={info.username}
            onChange={capture}
            placeholder="Enter Username"
            fullWidth
          />
          <TextField
            id="password"
            variant="outlined"
            label="Password"
            name="password"
            type="password"
            value={info.password}
            onChange={capture}
            helperText="Password must be atleast 6 characters length"
            fullWidth
            placeholder="Enter a password with minimum 6 characters"
          />
          <TextField
            id="confirmPassword"
            variant="outlined"
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={info.confirmPassword}
            onChange={capture}
            fullWidth
          />
          {loader === 0 && (
            <Button className="button" variant="contained" onClick={register}>
              Register Now
            </Button>
          )}
          {loader === 1 && (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <CircularProgress />
            </Box>
          )}

          <SnackbarProvider />
          <p className="secondary-action">
            Already have an account?
            <Link className="link" to="./login">
              Login here
            </Link>
          </p>
        </Stack>
      </Box>
      <Footer />
    </Box>
  );
};

export default Register;
