import React, { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import {
  HomeOutlined as HomeIcon,
  Dashboard as DashboardIcon,
  Room as RoomIcon,
  Info as InfoIcon,
  HelpOutline as HelpIcon,
  AttachMoney as MoneyIcon,
  Settings as SettingsIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";
import {
  Box,
  CssBaseline,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import "react-pro-sidebar/dist/css/styles.css";
import Item from "./Item";
import { tokens } from "../../Theme";
import classes from "../../index.css";

const navigationItems = [
  { path: "/", name: "Home", icon: <HomeIcon /> },
  { path: "/dashboard", name: "Dashboard", icon: <DashboardIcon /> },
  { path: "/roomsPage", name: "Rooms", icon: <RoomIcon /> },
  { path: "/aboutUs", name: "About", icon: <InfoIcon /> },
  { path: "/contacts", name: "Contact Information", icon: <HelpIcon /> },
  { path: "/finances", name: "Finances", icon: <MoneyIcon /> },
  { path: "/settings", name: "Settings", icon: <SettingsIcon /> },
];
export default function SideDrawer() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  const collapsedHandler = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <Box
      className={classes.sideDrawerContainer}
      sx={{
        "& .pro-sidebar-inner, & .pro-icon-wrapper": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-inner-item": { padding: "5px 35px 5px 20px !important" },
        "& .pro-inner-item:hover": { color: "#868dfb !important" },
        "& .pro-menu-item.active": { color: "#6870fa !important" },
      }}
    >
      <CssBaseline />
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          <MenuItem
            onClick={collapsedHandler}
            icon={isCollapsed ? <MenuIcon /> : undefined}
            style={{ margin: "10px 0 20px 0", color: colors.grey[100] }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography
                  onClick={collapsedHandler}
                  variant="h4"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  textAlign="center"
                  paddingLeft={isCollapsed ? undefined : "10%"}
                >
                  SMART HOME
                </Typography>
                <IconButton onClick={collapsedHandler}>
                  <MenuIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          <Box textAlign="center" paddingLeft={isCollapsed ? undefined : "10%"}>
            {navigationItems.map((item, index) => (
              <Item
                key={index}
                to={item.path}
                title={item.name}
                icon={item.icon}
                selected={selected}
                setSelected={setSelected}
                color={colors.grey[100]}
                sx={{ m: "10px 0 0 0" }}
              >
                {item.icon}
              </Item>
            ))}
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
}
