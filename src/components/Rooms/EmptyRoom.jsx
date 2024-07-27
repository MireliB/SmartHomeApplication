import { useTheme } from "@emotion/react";
import React, { useState } from "react";
import { tokens } from "../../Theme";
import {
  Box,
  Button,
  Card,
  CardContent,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import Header from "../Header";

export default function EmptyRoom({ onAddRoom, rooms, devices }) {
  const [selectedRoom, setSelectedRoom] = useState(null);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const roomCardHandler = (room) => {
    setSelectedRoom(room);
  };

  const backToRoomsHandler = () => {
    setSelectedRoom(null);
  };

  return (
    <Box m={"2dvh"}>
      <Header
        title={"Rooms Page"}
        subtitle={
          "This space allows you to create and manage rooms, providing you with control over various technologies within your home."
        }
      />
      {selectedRoom ? (
        <Box m={"40px 0 0 0 "}>
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
                      {device.name} - {device.status}
                    </ListItem>
                  ))}
              </List>
            </CardContent>
          </Card>
        </Box>
      ) : (
        <Box m={"40px 0 0 0 "} display="flex" flexWrap="wrap" gap={2}>
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
                      <ListItem key={device._id}>
                        Device: {device.name}
                      </ListItem>
                    )) || <ListItem>No devices</ListItem>}
                </List>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
      {!selectedRoom && (
        <Button
          variant="contained"
          style={{ marginTop: "2dvh" }}
          onClick={onAddRoom}
        >
          + Add A Room
        </Button>
      )}
    </Box>
  );
}
