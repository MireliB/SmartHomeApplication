import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Signup.module.css";
import { Box, Container, TextField, Typography, Button } from "@mui/material";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmed, setPasswordConfirmed] = useState("");
  const [message, setMessage] = useState("");

  // navigation short
  const nav = useNavigate();

  //handling email, password and confirming password

  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };
  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };
  const passwordConfirmedChangeHandler = (e) => {
    setPasswordConfirmed(e.target.value);
  };

  // Works~~

  const findErrors = () => {
    const errors = [];

    if (!email || !password || !passwordConfirmed) {
      errors.push("All Fields must be filled in");
    }
    if (email.split("@").length !== 2) {
      errors.push("An email must have exactly one @ sign");
    }
    if (password.length < 8) {
      errors.push("Password must be 8 characters or longer");
    }
    if (password !== passwordConfirmed) {
      errors.push("Passwords must match");
    }

    if (errors.length === 0) {
      nav("/login");
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = findErrors();

    setMessage(errors.length ? errors.join(", ") : "User created");
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      className={classes["signup-page-container"]}
    >
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>

        <Box
          component="form"
          noValidate
          sx={{ mt: 1 }}
          className={classes["signup-inputs"]}
        >
          <TextField
            margin="normal "
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={emailChangeHandler}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={passwordChangeHandler}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Confirm Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={passwordConfirmed}
            onChange={passwordConfirmedChangeHandler}
          />
        </Box>
      </Box>
      {message && (
        <Typography variant="body2" color="error" align="center">
          {message}
        </Typography>
      )}
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2, background: "#122b47" }}
        value="Sign Up"
        onClick={handleSubmit}
      >
        Sign Up
      </Button>
    </Container>
  );
}
