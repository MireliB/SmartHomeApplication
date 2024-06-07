import {
  Box,
  Button,
  Divider,
  TextField,
  Typography,
  Switch,
  FormControlLabel,
} from "@mui/material";
import React, { useState } from "react";
import Header from "../Header";

export default function Settings() {
  const [generalSettings, setGeneralSettings] = useState({
    darkMode: false,
    language: "English",
  });

  const [accountSettings, setAccountSettings] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleGeneralChange = (e) => {
    const { name, value, checked, type } = e.target;
    setGeneralSettings({
      ...generalSettings,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleAccountChange = (e) => {
    setAccountSettings({
      ...accountSettings,
      [e.target.name]: e.target.value,
    });
  };

  const saveGeneralSettings = () => {
    // Logic to save general settings
    console.log("General Settings saved:", generalSettings);
  };
  const saveAccountSettings = () => {
    // Logic to save account settings
    console.log("Account Settings saved:", accountSettings);
  };
  return (
    <Box m={2} component="main">
      <Header title={"SETTINGS"} subtitle={"Customize your preferences here"} />

      {/* General Settings Section */}
      <Box
        sx={{ mt: 4, px: 3, py: 2, border: "1px solid #ddd", borderRadius: 2 }}
      >
        <Typography variant="h6">General Settings</Typography>
        <Divider sx={{ my: 2 }} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <FormControlLabel
            control={
              <Switch
                checked={generalSettings.darkMode}
                onChange={handleGeneralChange}
                name="darkMode"
              />
            }
            label="Dark Mode"
            sx={{ width: "300px", mt: 2 }}
          />
          <TextField
            label="Language"
            name="language"
            value={generalSettings.language}
            onChange={handleGeneralChange}
            variant="outlined"
            fullWidth
            sx={{ mt: 2, width: "300px" }}
          />
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={saveGeneralSettings}
          >
            Save Changes
          </Button>
        </Box>
      </Box>

      {/* Account Settings Section */}
      <Box
        sx={{ mt: 4, px: 3, py: 2, border: "1px solid #ddd", borderRadius: 2 }}
      >
        <Typography variant="h6">Account Settings</Typography>
        <Divider sx={{ my: 2 }} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <TextField
            label="Username"
            name="username"
            value={accountSettings.username}
            onChange={handleAccountChange}
            variant="outlined"
            fullWidth
            sx={{ mt: 2, width: "300px" }}
          />
          <TextField
            label="Email"
            name="email"
            value={accountSettings.email}
            onChange={handleAccountChange}
            variant="outlined"
            fullWidth
            sx={{ mt: 2, width: "300px" }}
          />
          <TextField
            label="Password"
            type="password"
            name="password"
            value={accountSettings.password}
            onChange={handleAccountChange}
            variant="outlined"
            fullWidth
            sx={{ mt: 2, width: "300px" }}
          />
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={saveAccountSettings}
          >
            Save Changes
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
