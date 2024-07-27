import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rooms: [],
};

const findRoomIndexByName = (rooms, roomName) => {
  return rooms.findIndex((room) => room.roomName === roomName);
};

const filteredRoomsById = (rooms, roomId) => {
  return rooms.filter((room) => room.roomId !== roomId);
};

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

    deleteRoom: (state, action) => {
      const { roomName, roomId } = action.payload;

      const roomIndex = findRoomIndexByName(state.rooms, roomName);

      if (roomIndex !== -1) {
        state.rooms[roomIndex].rooms = filteredRoomsById(
          state.rooms[roomIndex].rooms,
          roomId
        );
      }
    },

    editRoom: (state, action) => {
      const { roomName, device: room } = action.payload;

      const roomIndex = findRoomIndexByName(state.rooms, roomName);

      if (roomIndex !== -1) {
        state.rooms[roomIndex] = updateRoom(
          state.rooms[roomIndex],
          room.deviceId,
          room
        );
      }
    },
  },
});

export const { setRooms, addRoom, deleteRoom, editRoom } = roomSlice.actions;

export default roomSlice.reducer;
