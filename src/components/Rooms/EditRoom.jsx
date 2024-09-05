import React, { useState, useEffect } from "react";

import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";

import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { editRoom } from "../../slice/roomSlice";
import { editDevice } from "../../slice/deviceSlice";

export default function EditRoom() {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();

  const { room } = state;
  const { device } = state;

  const [roomName, setRoomName] = useState("");
  const [roomType, setRoomType] = useState("");
  const [devices, setDevices] = useState(room.devices || []);

  useEffect(() => {
    if (room) {
      setRoomName(room.name || "");
      setRoomType(room.roomType || "");
    }
  }, [room]);

  const handleSave = () => {
    // Dispatch the editRoom action with the updated room details
    dispatch(editRoom({ _id: room, name: room.roomName, roomType }));
    // dispatch(editDevice({ _id: room, name: device.deviceName }));

    // Navigate back to the rooms list
    nav("/roomsPage");
  };

  const handleCancel = () => {
    nav("/roomsPage");
  };

  return (
    <Box m="40px 0">
      <Card>
        <CardContent>
          <Typography variant="h5">Edit Room</Typography>
          <TextField
            label="Room Name"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Room Type"
            value={roomType}
            onChange={(e) => setRoomType(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Typography variant="body2" mt={2}>
            Devices:
          </Typography>
          {devices.map((device, index) => (
            <Typography key={index} variant="body2">
              {device.name}
            </Typography>
          ))}
          <Box display="flex" justifyContent="space-between" mt={2}>
            <Button variant="contained" color="primary" onClick={handleSave}>
              Save
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleCancel}>
              Cancel
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
