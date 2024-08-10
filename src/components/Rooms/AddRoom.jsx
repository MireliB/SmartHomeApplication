import React, { useState } from "react";

import Header from "../Header";

import { Box, Button, Input, Typography } from "@mui/material";

import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AddRoom() {
  const nav = useNavigate();

  const token = localStorage.getItem("token");
  const [roomName, setRoomName] = useState("");
  const [roomType, setRoomType] = useState("");
  const [deviceName, setDeviceName] = useState("");
  const [status, setStatus] = useState("OFF");

  const roomNameChangeHandler = (e) => setRoomName(e.target.value);
  const roomTypeChangeHandler = (e) => setRoomType(e.target.value);
  const deviceChangeHandler = (e) => setDeviceName(e.target.value);

  const addRoomHandler = async () => {
    if (roomName && roomType) {
      try {
        const newRoom = { roomName, roomType }; // Adjusted for backend schema
        const roomResponse = await axios.post(
          "http://localhost:4000/room",
          newRoom,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (deviceName) {
          const newDevice = {
            name: deviceName,
            status: status, // Assuming a default status, adjust as needed
            room: roomResponse.data._id,
          };
          await axios.post("http://localhost:4000/device", newDevice, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        }
        setRoomName("");
        setRoomType("");
        setDeviceName("");
        nav("/roomsPage");
      } catch (err) {
        console.error("Error adding room and device:", err);
      }
    }
  };

  return (
    <Box m={2}>
      <Header
        title="Add Room"
        subtitle="You Can Create a Room and Choose a Type of Room"
      />
      <Typography>Room Name</Typography>
      <Input
        type="text"
        placeholder="Room Name"
        value={roomName}
        onChange={roomNameChangeHandler}
      />
      <Typography>Room Type</Typography>
      <Input
        type="text"
        placeholder="Room Type"
        value={roomType}
        onChange={roomTypeChangeHandler}
      />
      <Typography>Device Name</Typography>
      <Input
        type="text"
        placeholder="Device Name"
        value={deviceName}
        onChange={deviceChangeHandler}
      />
      <Button onClick={addRoomHandler} variant="contained">
        + Create Room
      </Button>
    </Box>
  );
}
