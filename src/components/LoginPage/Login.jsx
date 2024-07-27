import React, { useEffect, useState } from "react";
import { useTheme } from "@emotion/react";
import { Box, Button, Input, Link, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { tokens } from "../../Theme";
import axios from "axios";

export default function Login({ onLogin }) {
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

  const loginHandler = async (e) => {
    e.preventDefault();

    fetch("http://localhost:4000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((data) => {
            throw new Error(
              data.message || "Failed to Login. Please try Again"
            );
          });
        }
        return response.json();
      })
      .then((data) => {
        console.log("Login Response: ", data);

        localStorage.setItem("token", data.token);
        localStorage.setItem("loginTime", JSON.stringify(Date.now()));
        localStorage.setItem("userEmail", email);

        onLogin(email);
        nav("/dashboard");
      })
      .catch((err) => {
        console.error("Login error:", err);
        setErrorMsg(err.message || "Something went wrong, please try again");
      });
  };
  const navigateToSignUp = () => {
    nav("/signup");
  };

  return (
    <Box
      sx={{
        backgroundColor: colors.blueAccent[600],
        borderRadius: theme.shape.borderRadius,
        boxShadow: theme.shadows[2],
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: theme.spacing(3),
        maxWidth: 400,
        margin: "0 auto",
        marginTop: theme.spacing(5),
      }}
    >
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
          LOGIN
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
            SIGN UP
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}
