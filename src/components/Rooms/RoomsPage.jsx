import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";

import EmptyRoom from "./EmptyRoom";

import { setRooms } from "../../slice/roomSlice";
import { setDevices } from "../../slice/deviceSlice";

import axios from "axios";

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

  const roomsWithId = Array.isArray(rooms)
    ? rooms.map((room, index) => ({ ...room, id: index + 1 }))
    : [];

  const devicesWithId = Array.isArray(devices)
    ? devices.map((device, index) => ({ ...device, id: index + 1 }))
    : [];

  const getRoomsAndDevices = async () => {
    try {
      const roomsResponse = await axios.get("http://localhost:4000/rooms", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Fetched Rooms:", roomsResponse.data);
      dispatch(setRooms(roomsResponse.data));

      const devicesResponse = await axios.get("http://localhost:4000/devices", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Fetched Devices:", devicesResponse.data);
      dispatch(setDevices(devicesResponse.data));
    } catch (err) {
      console.error("Error Fetching rooms:", err);
    }
  };

  return (
    <Box className="rooms-page-container">
      <EmptyRoom
        onAddRoom={() => nav("/addRoom")}
        rooms={roomsWithId}
        devices={devicesWithId}
      />
    </Box>
  );
}
