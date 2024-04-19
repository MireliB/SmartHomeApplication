import { Box, Typography } from "@mui/material";
import React from "react";
import Header from "../Header";

export default function AboutUs() {
  return (
    <Box>
      <Header
        title={"About Us"}
        subtitle={"A little bit About This Application and About us"}
      />

      <Typography>
        Our Smart Home Application is designed to make your life easier and more
        efficient. With our innovative technology, you can control your home's
        lighting, temperature, security, and more, all from the convenience of
        your smartphone or computer.
      </Typography>
      <Typography>
        Our team is dedicated to providing you with the best smart home
        experience possible. We strive to continuously improve our products and
        services to meet your needs and exceed your expectations.
      </Typography>
      <Typography>
        Whether you're looking to save energy, increase security, or simply make
        your home more comfortable, our Smart Home Application has you covered.
        Join us in the future of home automation today!
      </Typography>
    </Box>
  );
}
