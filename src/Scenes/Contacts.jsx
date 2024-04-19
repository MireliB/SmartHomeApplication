import React from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../Theme";

import Header from "../components/Header";
import { mockDataContact } from "../data/mockData";
export default function Contacts() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const DeviceCell = ({ access }) => (
    <Box
      width="60%"
      m="0 auto"
      p="5px"
      display="flex"
      justifyContent="center"
      borderRadius="4px"
    />
  );

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "registrarId", headerName: "Registrar ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column-cell",
    },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "city", headerName: "City", flex: 1 },
    { field: "age", headerName: "Age", flex: 1 },
    { field: "zipCode", headerName: "Zip Code", flex: 1 },
    {
      field: "device",
      headerName: "Device",
      flex: 1,
      renderCell: ({ row }) => <DeviceCell access={row.access} />,
    },
    {
      field: "access",
      headerName: "Access Level",
      type: "text",
      headerAlign: "left",
      align: "left",
    },
  ];

  const gridStyles = {
    "& .MuiDataGrid-root, & .MuiDataGrid-cell": { border: "none" },
    "& .name-column-cell": { color: colors.greenAccent[300] },
    "& .MuiDataGrid-columnHeader": {
      backgroundColor: colors.blueAccent[700],
      borderBottom: "none",
    },
    "& .MuiDataGrid-virtualScroller": { backgroundColor: colors.primary[400] },
    "& .MuiDataGrid-footerContainer": {
      borderTop: "none",
      backgroundColor: colors.blueAccent[700],
    },
    "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
      color: `${colors.grey[100]} !important`,
    },
  };

  return (
    <Box m="20px">
      <Header
        title="CONTACTS"
        subtitle="List of Contacts for future Reference"
      />
      <Box m="40px 0 0 0" height="75vh" sx={gridStyles}>
        <DataGrid
          rows={mockDataContact}
          columns={columns}
          components={{ toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
}
