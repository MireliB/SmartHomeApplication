import React, { useState } from "react";
import { useTheme } from "@emotion/react";
import { Box, Button, Input, Link, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { tokens } from "../../Theme";
import axios from "axios";

// the login page is not working correctly right now need to check what cause's the problem
export default function Login({ isLoggedIn, setIsLoggedIn, onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const nav = useNavigate();

  const theme = useTheme();

  const colors = tokens(theme.palette.mode);

  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  // almost works
  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/login", {
        email,
        password,
      });
      console.log("Login response:", response.data); // Logging the response
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("loginTime", JSON.stringify(Date.now()));
        onLogin();
        nav("/dashboard");
      } else {
        setErrorMsg(response.data.message);
      }
    } catch (err) {
      console.error("Login error:", err); // Logging the error
      if (err.response) {
        setErrorMsg(
          err.response.data.message || "Failed to login. Please try again."
        );
      } else if (err.request) {
        setErrorMsg("No response from server. Please check your connection.");
      } else {
        setErrorMsg("An error occurred. Please try again.");
      }
    }
  };

  const navigateToSignUp = () => {
    nav("/signup");
  };

  return (
    <Box p={3} bgcolor={"background.paper"} boxShadow={1} borderRadius={2}>
      <Typography variant="h3">Login</Typography>
      <Box component={"form"} onSubmit={loginHandler}>
        <Box>
          <Typography variant="h5">Email:</Typography>
          <Input
            type="email"
            value={email}
            onChange={emailChangeHandler}
            required
          />
        </Box>
        <Box>
          <Typography variant="h5">Password:</Typography>
          <Input
            type="password"
            value={password}
            onChange={passwordChangeHandler}
            required
          />
        </Box>
        <Button
          variant="contained"
          color="primary"
          sx={{ color: "white", mt: 2 }}
          type="submit"
        >
          Login
        </Button>
      </Box>
      {errorMsg && (
        <Typography variant="body2" color="error" mt={2}>
          {errorMsg}
        </Typography>
      )}
      <Box mt={2}>
        <Typography variant="body2">
          Don't have an account?{" "}
          <Link
            component="button"
            sx={{ color: "white" }}
            variant="body2"
            onClick={navigateToSignUp}
          >
            Sign Up
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}
