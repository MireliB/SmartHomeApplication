import { useTheme } from "@emotion/react";
import { Box, Button, Input, Typography } from "@mui/material";
import React, { useState } from "react";
import { tokens } from "../../Theme";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  const formHandler = (e) => {
    e.preventDefault();
    let userDate = {
      email: email,
      password: password,
    };

    // http request from server method - works!!
    fetch("/api/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDate),
    })
      .then((response) => response.json())
      .then((data) => console.log("data", email, password));
  };

  return (
    <Box>
      <form onSubmit={formHandler}>
        <Typography variant="h5">Email</Typography>

        <Input type="text" placeholder="Email" onChange={emailChangeHandler} />

        <Box>
          <Typography variant="h5">Password</Typography>

          <Input
            type="password"
            placeholder="Password"
            onChange={passwordChangeHandler}
          />
        </Box>

        <Button style={{ color: "white", background: colors.blueAccent[500] }}>
          Login
        </Button>
      </form>
    </Box>
  );
}
