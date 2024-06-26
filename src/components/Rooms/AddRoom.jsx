import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import classes from "./AddRoom.module.css";
import { addRoom, editRoom, deleteRoom } from "../../slice/roomSlice";
import { Box, Button, Input, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import AddDevices from "../RoomDevices/AddDevices";
export default function AddRoom({ showRoomHandler, showRoom, setShowRoom }) {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const { rooms } = useSelector((state) => state.rooms);
  const { devices } = useSelector((state) => state.devices);

  const [roomName, setRoomName] = useState("");
  const [roomType, setRoomType] = useState("");

  const [deviceName, setDeviceName] = useState("");
  // use this for existing rooms
  // https://smart-home-application-4447e-default-rtdb.firebaseio.com/
  const roomNameChangeHandler = (e) => {
    setRoomName(e.target.value);
  };

  const roomTypeChangeHandler = (e) => {
    setRoomType(e.target.value);
  };

  const addRoomHandler = () => {
    const newRoom = {
      roomName: roomName,
      roomType: roomType,
      rooms: [],
    };
    const newDevice = {
      deviceName: deviceName,
      devices: [],
    };
    //WORKS!
    if (roomName && roomType) {
      dispatch(addRoom(newRoom));
    }
    // almost works
    if (deviceName) {
      dispatch(AddDevices(newDevice));
    }
    setRoomName("");
    setRoomType("");
    setDeviceName("");
  };

  const deviceChangeHandler = (e) => {
    setDeviceName(e.target.value);
  };

  // http requests - help to communicate from frontend to backend
  return (
    <Box m={2}>
      <Header
        title="Add Room"
        subtitle="You Can Create a Room and Choose a Type of Room"
      />
      <Typography>
        Room Name <br />
      </Typography>
      <Input
        type="text"
        placeholder="Room Name"
        value={roomName}
        onChange={roomNameChangeHandler}
      />
      <Typography>
        Room Type <br />
      </Typography>
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
