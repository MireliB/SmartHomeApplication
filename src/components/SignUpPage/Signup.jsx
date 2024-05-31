import React, { useState } from "react";
import axios from "axios";
import { Box, Button, Input, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/signup", {
        email,
        password,
      });
      setMessage(res.data.message);
      // Redirect to login page after successful signup
      navigate("/login");
    } catch (err) {
      setMessage("Signup Failed");
    }
  };

  return (
    <Box>
      <Typography variant="h3">Register</Typography>
      <Box component={"form"} onSubmit={handleSubmit}>
        <Box>
          <Typography variant="h5">Email:</Typography>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Box>
        <Box>
          <Typography variant="h5">Password:</Typography>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Box>
        <Button sx={{ color: "white" }} type="submit">
          Sign Up
        </Button>
      </Box>
      <p>{message}</p>
    </Box>
  );
}
