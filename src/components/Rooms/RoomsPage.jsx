import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Typography } from "@mui/material";
import axios from "axios";
import EmptyRoom from "./EmptyRoom";

export default function RoomsPage() {
  const dispatch = useDispatch();
  const [showRoom, setShowRoom] = useState(false);
  const [roomData, setRoomData] = useState([]);
  const { rooms } = useSelector((state) => state.rooms);
  const { devices } = useSelector((state) => state.devices);
  const nav = useNavigate();

  const token = localStorage.getItem("token");

  const roomsWithId = rooms.map((room, index) => ({ ...room, id: index + 1 }));
  const devicesWithId = devices.map((device, index) => ({
    ...device,
    id: index + 1,
  }));

  const getRooms = async () => {
    try {
      const response = await axios.get("http://localhost:4000/rooms", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRoomData(response.data);
    } catch (err) {
      console.error("Error Fetching rooms:", err);
    }
  };

  useEffect(() => {
    if (token) {
      getRooms();
    }
  }, [token]);

  //separates to constant variable, mapped the exist rooms and its shown in the page
  // show room toggling
  const showRoomHandler = () => {
    setShowRoom((prev) => !prev);
  };

  return (
    <Box className="rooms-page-container">
      <EmptyRoom
        onAddRoom={() => nav("/addRoom")}
        showRoomHandler={showRoomHandler}
        showRoom={showRoom}
        setShowRoom={setShowRoom}
        rooms={roomsWithId}
        devices={devicesWithId}
        dispatch={dispatch}
      />
    </Box>
  );
}

//TODO
// connect the room details to room component - add a roomCard to hold the room
// and when its clicked it will show the roomDetails
export function RoomPanel({ room, onClick }) {
  return (
    <Box
      onClick={() => onClick(room)}
      sx={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "16px",
        margin: "8px",
        cursor: "pointer",
        backgroundColor: "#f9f9f9",
      }}
    >
      <Typography variant="h6">{room.roomName}</Typography>
      <Typography variant="subtitle1">{room.roomType}</Typography>
      <Button
        variant="contained"
        onClick={(e) => {
          e.stopPropagation();
          onClick(room);
        }}
      ></Button>
    </Box>
  );
}
