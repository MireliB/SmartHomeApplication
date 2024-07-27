import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Room from "./Room";

export default function RoomDetails() {
  // const { id } = useParams();
  // const [room, setRoom] = useState(null);
  // useEffect(() => {
  //   // fetch room data from API
  //   fetch(`http://localhost:4000/room/${id}`, {
  //     headers: {
  //       Authorization: `Bearer ${localStorage.getItem("token")}`,
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((data) => setRoom(data))
  //     .catch((err) => console.log("Error Fetching Data:", err));
  // }, [id]);
  // if (!room) return <Box>Loading....</Box>;
  // return (
  //   <Room>
  //     <Typography variant="h6" color={"white"}>
  //       {room.roomName}
  //     </Typography>
  //     {/* <ul>
  //       {room.devices.map((device) => {
  //         <li key={device.deviceId}>{device.deviceName}</li>;
  //       })}
  //     </ul> */}
  //     TEST
  //   </Room>
  // );
}
