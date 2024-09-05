import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rooms: [],
};

const findRoomIndexByName = (rooms, roomName) => {
  return rooms.findIndex((room) => room.roomName === roomName);
};

// const filteredRoomsById = (rooms, roomId) =>
//   rooms.filter((room) => room.roomId !== roomId);

// const updateRoom = (room, roomId, updatedRoom) => {
//   return {
//     ...room,
//     rooms: room.rooms.map((room) =>
//       room.roomId === roomId ? { ...room, ...updatedRoom } : room
//     ),
//   };
// };

const removeRoomsById = (rooms, roomId) => {
  const roomIndex = rooms.findIndex((room) => room.roomId === roomId);
  if (roomIndex !== -1) rooms.splice(roomId, 1);
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
      const { _id, device } = action.payload;
      const roomIndex = state.rooms.findIndex((room) => room.id === _id);
      if (roomIndex !== -1) {
        if (device) {
          const deviceIndex = state.rooms[roomIndex].devices.findIndex(
            (device) => device.id === device.deviceId
          );

          if (deviceIndex !== -1) {
            state.rooms[roomIndex].devices[deviceIndex] = {
              ...state.rooms[roomIndex].devices[deviceIndex],
              ...device,
            };
          }
        } else {
          state.rooms[roomIndex] = {
            ...state.rooms[roomIndex],
            ...action.payload,
          };
        }
      }
    },

    deleteRoom: (state, action) => {
      const { roomId } = action.payload;

      const roomIndex = state.rooms.findIndex((room) => room.id === roomId);

      if (roomIndex !== -1) {
        state.rooms.splice(roomIndex, 1);
      }
    },
  },
});

export const { setRooms, addRoom, deleteRoom, editRoom } = roomSlice.actions;

export default roomSlice.reducer;
