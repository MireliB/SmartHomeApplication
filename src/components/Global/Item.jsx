import { useTheme } from "@emotion/react";
import React from "react";
import { MenuItem } from "react-pro-sidebar";
import { tokens } from "../../Theme";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function Item({ title, to, icon, selected, setSelected }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{ color: colors.grey[100] }}
      icon={icon}
      onClick={() => setSelected(title)}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
}
