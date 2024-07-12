import { useTheme } from "@emotion/react";
import React from "react";
import { tokens } from "../../Theme";
import { Box, Button } from "@mui/material";
import Header from "../Header";
import { DataGrid } from "@mui/x-data-grid";

export default function EmptyRoom({
  onAddRoom,
  rooms,
  devices,
  showRoomHandler,
  showRoom,
  dispatch,
}) {
  const columns = [
    { field: "roomName", headerName: "Room Name", flex: 1 },
    { field: "roomType", headerName: "Room Type", flex: 1 },
    {
      field: "devices",
      headerName: "Devices",
      flex: 1,
      renderCell: ({ row }) => (
        <Box
          width={"60%"}
          m={"0 auto"}
          p={"5px"}
          display={"flex"}
          justifyContent={"center"}
          backgroundColor={
            row.access === "admin"
              ? colors.greenAccent[600]
              : colors.greenAccent[700]
          }
          borderRadius={"4px"}
        ></Box>
      ),
      align: "left",
    },
  ];

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m={"2dvh"}>
      <Header
        title={"Rooms Page"}
        subtitle={
          "This space allows you to create and manage rooms, providing you with control over various technologies within your home."
        }
      />
      <Box
        m={"40px 0 0 0 "}
        height={"75vh"}
        sx={{
          "& .MuiDataGrid-root": { border: "none" },
          "& .MuiDataGrid-cell": { borderBottom: "none" },
          "& .MuiDataGrid-columnHeader": {
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
          },
        }}
      >
        <DataGrid rows={rooms} columns={columns} devices={devices} />
      </Box>
      <Button
        variant="contained"
        style={{ marginTop: "2dvh" }}
        onClick={onAddRoom}
      >
        + Add A Room
      </Button>
    </Box>
  );
}
