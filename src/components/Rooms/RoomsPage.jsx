import React, { useEffect } from "react";

import EmptyRoom from "./EmptyRoom";

import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { setRooms } from "../../slice/roomSlice";
import { setDevices } from "../../slice/deviceSlice";

import { useNavigate } from "react-router-dom";

import { Box } from "@mui/material";

export default function RoomsPage() {
  const dispatch = useDispatch();
  const { rooms } = useSelector((state) => state.rooms);
  const { devices } = useSelector((state) => state.devices);
  const token = localStorage.getItem("token");
  const nav = useNavigate();

  useEffect(() => {
    if (token) {
      getRoomsAndDevices();
    }
  }, [token]);

  const getRoomsAndDevices = async () => {
    try {
      const roomsResponse = await axios.get("http://localhost:4000/rooms", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log("Fetched Rooms:", roomsResponse.data);
      dispatch(setRooms(roomsResponse.data));

      const devicesResponse = await axios.get("http://localhost:4000/devices", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log("Fetched Devices:", devicesResponse.data);
      dispatch(setDevices(devicesResponse.data));
    } catch (err) {
      console.error("Error Fetching rooms:", err);
    }
  };

  return (
    <Box className="rooms-page-container">
      <EmptyRoom
        onAddRoom={() => nav("/addRoom")}
        rooms={rooms}
        devices={devices}
      />
    </Box>
  );
}
