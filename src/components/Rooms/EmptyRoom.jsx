import { useTheme } from "@emotion/react";
import React, { useEffect } from "react";
import { tokens } from "../../Theme";
import { Box, Button } from "@mui/material";
import Header from "../Header";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector } from "react-redux";

export default function EmptyRoom({ onAddRoom }) {
  const { rooms } = useSelector((state) => state.rooms);
  const { devices } = useSelector((state) => state.devices);
  useEffect(() => {
    console.log("Rooms: ", rooms);
    console.log("Devices: ", devices);
  });

  const rows = Array.isArray(rooms)
    ? rooms.map((room, index) => ({
        id: room.id || index + 1,
        roomName: room.roomName || "Unknown Name",
        roomType: room.roomType || "Unknown Type",
        devices: Array.isArray(devices)
          ? devices
              .filter((device) => device.roomId === room._id)
              .map((device) => device.deviceName)
              .join(", ")
          : "No devices",
        access: room.access || "Unknown Access",
      }))
    : [];

  const columns = [
    { field: "roomName", headerName: "Room Name", flex: 1 },
    { field: "roomType", headerName: "Room Type", flex: 1 },
    { field: "devices", headerName: "Devices", flex: 1 },
    { field: "access", headerName: "Access", flex: 1 },
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
        <DataGrid rows={rows} columns={columns} devices={devices} />
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
