import React, { useState } from "react";

import { useTheme } from "@emotion/react";
import { CheckCircleOutline, ErrorOutline } from "@mui/icons-material";

import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";
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
  IconButton,
} from "@mui/material";

import { deleteRoom, editRoom } from "../../slice/roomSlice";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import Header from "../Header";

import axios from "axios";

export function EmptyRoom({ onAddRoom, rooms, devices }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const [selectedRoom, setSelectedRoom] = useState(null);
  const [loading, setLoading] = useState(false);

  const [selectedDevice, setSelectedDevice] = useState(null);

  const [message, setMessage] = useState({ show: false, text: "", color: "" });

  const [deviceStatus, setDeviceStatus] = useState(
    devices.reduce((acc, device) => {
      acc[device._id] = device.status;

      return acc;
    }, {})
  );
  const nav = useNavigate();

  const dispatch = useDispatch();

  const handleRoomSelection = (room) => setSelectedRoom(room);

  const handleBackToRooms = () => setSelectedRoom(null);

  const theme = useTheme();

  const colors = tokens(theme.palette.mode);

  const toggleDeviceStatus = (device) => {
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
    }, 1000);
  };

  const handleOpenPopup = (room) => {
    setSelectedRoom(room);
    setIsPopupOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedRoom && selectedRoom._id) {
      await handleDeleteRoom();
      setIsPopupOpen(false);
      setSelectedRoom(null);
    }
  };

  // doesnt work
  const handleRoomEdit = (room) => {
    if (!room || !room._id) return;

    const updateDevice = { deviceId: selectedDevice };

    dispatch(editRoom({ _id: room._id, device: updateDevice }));

    setMessage({
      show: true,
      text: "Room edited successfully",
      color: "green",
    });

    nav(`/editRoom/${room._id}`, { state: { room } });
  };

  // doesnt work
  const handleDeleteRoom = async (roomId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("No Token Found");
    }

    try {
      const response = await axios.delete(
        `http://localhost:4000/room/${roomId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Room deleted successfully", response.data);

      dispatch(deleteRoom({ id: roomId }));

      setMessage({
        show: true,
        text: "Room deleted successfully",
        color: "red",
      });

      handleBackToRooms();
    } catch (err) {
      console.error("Error Deleting Room:", err);
    }
    setIsPopupOpen(false);
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
    <Box m="40px 0 0 0">
      <Button onClick={handleBackToRooms} style={{ color: "white" }}>
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
          <Typography variant="h5">
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
                    onClick={() => toggleDeviceStatus(device)}
                    disabled={loading}
                    variant="contained"
                    style={{
                      color: "white",
                      backgroundColor:
                        deviceStatus[device._id] === "on" ? "green" : "red",
                    }}
                  >
                    {deviceStatus[device._id] === "on" ? "Turn Off" : "Turn On"}
                  </Button>
                </ListItem>
              ))}
          </List>

          <Box display="flex" justifyContent="flex-end" mt={2}>
            <IconButton
              aria-label="edit"
              onClick={(e) => {
                e.stopPropagation();
                handleRoomEdit(selectedRoom);
              }}
              style={{ color: colors.grey[100] }}
            >
              <EditIcon />
            </IconButton>

            <IconButton
              aria-label="delete"
              onClick={(e) => {
                e.stopPropagation();
                handleOpenPopup(selectedRoom);
              }}
              style={{ color: colors.grey[100] }}
            >
              <DeleteIcon />
            </IconButton>

            {/* change design to not show the dialog in the same page */}
            {isPopupOpen && (
              <div>
                <p>Are you sure you want to delete this room? </p>
                <button onClick={confirmDelete}>Delete</button>
                <button onClick={() => setIsPopupOpen(false)}>Cancel</button>
              </div>
            )}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );

  const renderRoomList = () => (
    <Box m="40px 0 0 0" display="flex" flexWrap="wrap" gap={2}>
      {rooms.map((room, index) => (
        <Card
          key={index}
          onClick={() => handleRoomSelection(room)}
          sx={{
            width: "300px",
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
            cursor: "pointer",
          }}
        >
          <CardContent>
            <Typography variant="h5">
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
    <Box m="2dvh">
      {renderHeader()}
      {selectedRoom ? renderRoomDetails() : renderRoomList()}
      {!selectedRoom && renderAddRoomButton()}

      {renderSnackbar()}
    </Box>
  );
}
