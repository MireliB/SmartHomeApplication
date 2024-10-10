import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rooms: [],
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
      const { _id, name, roomType, device } = action.payload;

      const roomIndex = state.rooms.findIndex((room) => room._id === _id);

      if (roomIndex !== -1) {
        state.rooms[roomIndex] = {
          ...state.rooms[roomIndex],
          name,
          roomType,
          device: device,
        };
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
