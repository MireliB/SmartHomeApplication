import { Box, Button, Typography } from "@mui/material";

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
