import { Box, Button, Typography } from "@mui/material";
import React from "react";
import Header from "../Header";

export default function Settings() {
  return (
    <Box m={2} component="main">
      <Header title={"SETTINGS"} subtitle={"Customize your preferences here"} />
      <Box
        sx={{
          mt: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h6">General Settings</Typography>
        {/* need to Add  general settings components here */}
        <Button variant="contained" color="primary" sx={{ mt: 2 }}>
          Save Changes
        </Button>
      </Box>
      <Box
        sx={{
          mt: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h6">Account Settings</Typography>
        {/* need to Add account settings components here */}
        <Button variant="contained" color="primary" sx={{ mt: 2 }}>
          Save Changes
        </Button>
      </Box>
    </Box>
  );
}
