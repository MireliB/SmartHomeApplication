import React, { useState } from "react";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { tokens } from "../../Theme";
import Header from "../Header";
import RoomIcon from "@mui/icons-material/MeetingRoom";
import DeviceIcon from "@mui/icons-material/DevicesOutlined";
import StatBox from "../StatBox";

export default function Dashboard({ isLoggedIn }) {
  const theme = useTheme();

  const colors = tokens(theme.palette.mode);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { rooms } = useSelector((state) => state.rooms);
  const { devices } = useSelector((state) => state.devices);

  const latestRooms = rooms.slice(-3);
  const latestDevices = devices.slice(-3);

  const handleShowRoomsPage = () => {
    navigate("/roomsPage");
  };

  console.log("devices from redux", devices);

  return (
    <Box m={"2vh"}>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Header
          title="DASHBOARD"
          subtitle="Welcome to your smart home Dashboard panel! From here, you can manage your home's devices with ease."
        />

        <Box>
          <Button
            variant="contained"
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "0.8vw",
              fontWeight: "bold",
              padding: "1vh 1vw",
            }}
            onClick={handleShowRoomsPage}
          >
            Move to Rooms Page
          </Button>
        </Box>
      </Box>

      {/* GRID  */}
      <Box
        display={"grid"}
        gridTemplateAreas={"repeat(12, 1fr)"}
        gridAutoRows={"14vh"}
        gap={"3vh"}
      >
        <Box
          gridColumn={"span 3"}
          backgroundColor={colors.primary[400]}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <StatBox
            title={"Rooms"}
            subtitle={`Latest Rooms: ${latestRooms
              .map((room) => room.name)
              .join(", ")}`}
            icon={
              <RoomIcon
                sx={{ color: colors.greenAccent[400], fontSize: "2.1vw" }}
              />
            }
          ></StatBox>
          <StatBox
            title={"Devices"}
            subtitle={`Latest Devices: ${latestDevices
              .map((device) => device.name)
              .join(", ")}`}
            icon={
              <DeviceIcon
                sx={{ color: colors.greenAccent[600], fontSize: "2.1vw" }}
              />
            }
          ></StatBox>
        </Box>

        <Box
          gridColumn={"span 8 "}
          gridRow={"span 2"}
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt={"25px"}
            p={"0 30px"}
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight={"600"}
                color={colors.grey[100]}
              >
                Existing Rooms
              </Typography>
              <Typography
                variant="h5"
                fontWeight={"500"}
                color={colors.greenAccent[500]}
              >
                {rooms.map((room, index) => (
                  <Typography key={index}>
                    Room Name: {room.name}, RoomType: {room.roomType}
                    {/* TODO
                      FIX THE DELETE BUTTON - SAYS ROOM IS UNDEFINED */}
                    {/* <button onClick={() => deleteRoomHandler(room.roomName)}>
                      DELETE
                    </button> */}
                  </Typography>
                ))}

                {/* {devices.map((device) => (
                  <Typography>
                    Device Name: {device.name}, Status: {device.status}
                  </Typography>
                ))} */}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
