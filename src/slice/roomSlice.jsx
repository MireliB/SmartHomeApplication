import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rooms: [],
};

const findRoomIndexByName = (rooms, roomName) => {
  return rooms.findIndex((room) => room.roomName === roomName);
};

// const removeRoomsById = (rooms, roomId) => {
//   const roomIndex = rooms.findIndex((room) => room.roomId === roomId);
//   if (roomIndex !== -1) rooms.splice(roomId, 1);
// };

const updateRoom = (room, roomId, updatedRoom) => {
  return {
    ...room,
    rooms: room.rooms.map((room) =>
      room.roomId === roomId ? { ...room, ...updatedRoom } : room
    ),
  };
};

export const roomSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {
    setRooms: (state, action) => {
      state.rooms = action.payload;
    },
    addRoom: (state, action) => {
      state.rooms.push(action.payload);
    },

    editRoom: (state, action) => {
      const { roomName, room } = action.payload;

      const roomIndex = findRoomIndexByName(state.rooms, roomName);

      if (roomIndex !== -1) {
        state.rooms[roomIndex] = updateRoom(
          state.rooms[roomIndex],
          room.deviceId,
          room
        );
      }
    },

    deleteRoom: (state, action) => {
      const { roomId } = action.payload;
      const roomIndex = state.rooms.findIndex((room) => room._id === roomId);
      if (roomIndex !== -1) {
        state.rooms.splice(roomIndex, 1);
      }
    },
  },
});

export const { setRooms, addRoom, deleteRoom, editRoom } = roomSlice.actions;

export default roomSlice.reducer;
