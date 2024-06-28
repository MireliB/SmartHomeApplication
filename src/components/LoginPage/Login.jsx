import React, { Component } from "react";
import { Box, Button, Input, Link, Typography, withTheme } from "@mui/material";
import { tokens } from "../../Theme";
import axios from "axios";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errorMsg: "",
    };
  }
  emailChangeHandler = (e) => {
    this.setState({ email: e.target.value });
  };
  passwordChangeHandler = (e) => {
    this.setState({ password: e.target.value });
  };

  loginHandler = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;

    try {
      const response = await axios.post("http://localhost:4000/login", {
        email,
        password,
      });
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("loginTime", JSON.stringify(Date.now()));
        localStorage.setItem("userEmail", email);

        this.props.onLogin(email);
        this.props.history.push("/dashboard");
      } else {
        this.setState({ errorMsg: response.data.message });
      }
    } catch (err) {
      if (err.response) {
        this.setState({
          errorMsg:
            err.response.data.message || "Failed to login. Please try again.",
        });
      } else if (err.request) {
        this.setState({
          errorMsg: "No response from server. Please check your connection.",
        });
      } else {
        this.setState({ errorMsg: "An error occurred. Please try again." });
      }
    }
  };

  navigateToSignUp = () => {
    this.props.history.push("signup");
  };
  render() {
    const { theme } = this.props;
    const colors = tokens(theme.palette.mode);

    return (
      <Box p={3} bgcolor={"background.paper"} boxShadow={1} borderRadius={2}>
        <Typography variant="h3">Login</Typography>
        <Box component={"form"} onSubmit={this.loginHandler}>
          <Box>
            <Typography variant="h5">Email:</Typography>
            <Input
              type="email"
              value={this.state.email}
              onChange={this.handleEmailChange}
              required
            />
          </Box>
          <Box>
            <Typography variant="h5">Password:</Typography>
            <Input
              type="password"
              value={this.state.password}
              onChange={this.handlePasswordChange}
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
        {this.state.errorMsg && (
          <Typography variant="body2" color="error" mt={2}>
            {this.state.errorMsg}
          </Typography>
        )}
        <Box mt={2}>
          <Typography variant="body2">
            Don't have an account?{" "}
            <Link
              component="button"
              sx={{ color: "white" }}
              variant="body2"
              onClick={this.navigateToSignUp}
            >
              SIGN UP
            </Link>
          </Typography>
        </Box>
      </Box>
    );
  }
}

export default withTheme(Login);
