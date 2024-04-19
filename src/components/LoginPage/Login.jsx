import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Login.module.css";
import {
  TextField,
  Button,
  Typography,
  Link,
  Container,
  Box,
} from "@mui/material";
export default function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // create HTTP FILE
        // const dataFromServer = await fetchDataHttp();
        // console.log(dataFromServer);
        // setData(dataFromSever);
      } catch (err) {
        console.log("Error fetching data", err);
      }
    };

    fetchData();
  }, []);

  // Works~~
  const submitHandler = useCallback(
    (e) => {
      e.preventDefault();
      const errors = findErrors();
      if (errors.length === 0) {
        nav("/");
      } else {
        setErrors(errors);
      }
    },
    [email, password, nav]
  );

  const findErrors = () => {
    const errors = [];

    if (!email || !password) {
      errors.push("Please Enter A Valid Email Or Password");
    }
    if (!email.includes("@")) {
      errors.push("Email is Not Valid");
    }
    if (password.length < 8) {
      errors.push("Password Is Not Valid");
    }
    if (errors.length === 0) {
      nav("/");
    }
    return errors;
  };

  const emailChangeHandler = useCallback((e) => {
    setEmail(e.target.value);
  }, []);

  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
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
        </Box>
      </Box>
      {errors && (
        <Typography variant="body2" color="error" align="center">
          {errors}
        </Typography>
      )}
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2, background: "#122b47" }}
        onClick={submitHandler}
      >
        Sign In
      </Button>
      <Typography variant="body2" align="center">
        Don't have an account? <Link href="/signup">Sign Up</Link>
      </Typography>
    </Container>
  );
}
