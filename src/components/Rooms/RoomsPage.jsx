import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addRoom } from "../../slice/roomSlice";
import { Box, Button, Typography } from "@mui/material";
import AddDevices from "../RoomDevices/AddDevices";
import Room from "./Room";
import Header from "../Header";
import { useTheme } from "@emotion/react";
import { tokens } from "../../Theme";
import { DataGrid } from "@mui/x-data-grid";

export default function RoomsPage() {
  const dispatch = useDispatch();
  const { rooms } = useSelector((state) => state.rooms);
  const { devices } = useSelector((state) => state.devices);
  const nav = useNavigate();
  const [showRoom, setShowRoom] = useState(false);

  //separates to constant variable, mapped the exist rooms and its shown in the page
  const roomsWithId = rooms.map((room, index) => ({ ...room, id: index + 1 }));
  const devicesWithId = devices.map((device, index) => ({
    ...device,
    id: index + 1,
  }));
  // show room toggling
  const showRoomHandler = () => {
    setShowRoom((prev) => !prev);
  };

  return (
    <div className="rooms-page-container">
      <EmptyRoom
        toggle={() => nav("/addRoom")}
        showRoomHandler={showRoomHandler}
        showRoom={showRoom}
        setShowRoom={setShowRoom}
        rooms={roomsWithId} // Pass rooms data to EmptyRoom component
        devices={devicesWithId}
        dispatch={dispatch} // Pass dispatching for using in empryRoom Component
      />
    </div>
  );
}

function EmptyRoom({ toggle, setAddRoomIsOpen, dispatch, rooms, devices }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

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

  return (
    <Box m={"2dvh"}>
      <Header
        title={"Welcome to the Rooms Page!"}
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
        {/* Use rooms data */}
      </Box>
      <Button
        variant="contained"
        style={{ marginTop: "2dvh" }}
        onClick={toggle}
      >
        + Add A Room
      </Button>
    </Box>
  );
}

//TODO
//CREATE A ROOM COMPONENT THAT SHOWS EVERY SINGLE ROOM SEPARATLY,
//  (ROOM DETAILS LIKE NAME TYPE AND IN THE ROOM CHOSE A DEVICE CONTROLLER)
