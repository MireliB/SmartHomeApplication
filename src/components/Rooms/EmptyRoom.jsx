import { useTheme } from "@emotion/react";
import React, { useState } from "react";
import { tokens } from "../../Theme";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  List,
  ListItem,
  Snackbar,
  Typography,
} from "@mui/material";

import { CheckCircleOutline, ErrorOutline } from "@mui/icons-material";

import Header from "../Header";

export default function EmptyRoom({ onAddRoom, rooms, devices }) {
  const [selectedRoom, setSelectedRoom] = useState(null);

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState({ show: false, text: "", color: "" });

  const [deviceStatus, setDeviceStatus] = useState(
    devices.reduce((acc, device) => {
      acc[device._id] = device.status;
      return acc;
    }, {})
  );

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const roomCardHandler = (room) => {
    setSelectedRoom(room);
  };

  const backToRoomsHandler = () => {
    setSelectedRoom(null);
  };

  const devicesToggleStatus = (device) => {
    setLoading(true);

    const newStatus = deviceStatus[device._id] === "off" ? "on" : "off";

    setTimeout(() => {
      setLoading(false);
      setDeviceStatus((prevState) => ({
        ...prevState,
        [device._id]: newStatus,
      }));
      setMessage({
        show: true,
        text: `Device ${device.name} turned ${newStatus}`,
        color: newStatus === "on" ? "green" : "red",
      });
    }, 1000); // Simulating network delay
  };

  const renderHeader = () => (
    <Header
      title={"Rooms Page"}
      subtitle={
        "This space allows you to create and manage rooms, providing you with control over various technologies within your home."
      }
    />
  );

  const renderRoomDetails = () => (
    <Box m={"40px 0 0 0"}>
      <Button onClick={backToRoomsHandler} style={{ color: "white" }}>
        Back to Rooms
      </Button>
      <Card
        sx={{
          backgroundColor: colors.blueAccent[700],
          color: colors.grey[100],
          mb: 2,
        }}
      >
        <CardContent>
          <Typography variant="h5" component="div">
            Room Name: {selectedRoom.name || "No name specified"}
          </Typography>
          <Typography variant="body2">
            Room Type: {selectedRoom.roomType || "No type specified"}
          </Typography>
          <Typography variant="body2">Devices:</Typography>
          <List>
            {devices
              .filter(
                (device) =>
                  device.room &&
                  device.room.toString() === selectedRoom._id.toString()
              )
              .map((device) => (
                <ListItem key={device._id}>
                  <Typography variant="body2" style={{ flexGrow: 1 }}>
                    {device.name} -{" "}
                    {loading && deviceStatus[device._id] !== device.status ? (
                      <CircularProgress size={14} />
                    ) : (
                      deviceStatus[device._id]
                    )}
                  </Typography>
                  <Button
                    onClick={() => devicesToggleStatus(device)}
                    disabled={loading}
                    variant="contained"
                    style={{
                      backgroundColor:
                        deviceStatus[device._id] === "on" ? "green" : "red",
                      color: "white",
                    }}
                  >
                    {deviceStatus[device._id] === "on" ? "Turn Off" : "Turn On"}
                  </Button>
                </ListItem>
              ))}
          </List>
        </CardContent>
      </Card>
    </Box>
  );

  const renderRoomList = () => (
    <Box m={"40px 0 0 0"} display="flex" flexWrap="wrap" gap={2}>
      {rooms.map((room, index) => (
        <Card
          key={index}
          onClick={() => roomCardHandler(room)}
          sx={{
            width: "300px",
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
            cursor: "pointer",
          }}
        >
          <CardContent>
            <Typography variant="h5" component="div">
              Room Name: {room.name || "No name specified"}
            </Typography>
            <Typography variant="body2">
              Room Type: {room.roomType || "No type specified"}
            </Typography>
            <Typography variant="body2">Devices:</Typography>
            <List>
              {devices
                .filter(
                  (device) =>
                    device.room &&
                    device.room.toString() === room._id.toString()
                )
                .map((device) => (
                  <ListItem key={device._id}>Device: {device.name}</ListItem>
                )) || <ListItem>No devices</ListItem>}
            </List>
          </CardContent>
        </Card>
      ))}
    </Box>
  );

  const renderAddRoomButton = () => (
    <Button
      variant="contained"
      style={{ marginTop: "2dvh" }}
      onClick={onAddRoom}
    >
      + Add A Room
    </Button>
  );

  const renderSnackbar = () => (
    <Snackbar
      open={message.show}
      autoHideDuration={3000}
      onClose={() => setMessage({ show: false, text: "", color: "" })}
      message={
        <span style={{ color: message.color }}>
          {message.color === "green" ? (
            <CheckCircleOutline />
          ) : (
            <ErrorOutline />
          )}
          {message.text}
        </span>
      }
    />
  );

  return (
    <Box m={"2dvh"}>
      {renderHeader()}
      {selectedRoom ? renderRoomDetails() : renderRoomList()}
      {!selectedRoom && renderAddRoomButton()}
      {renderSnackbar()}
    </Box>
  );
}
