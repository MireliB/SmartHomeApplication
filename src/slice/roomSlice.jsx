// Utility function for creating Redux slices
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rooms: JSON.parse(window.localStorage.getItem("rooms")) || [],
};

const findRoomIndexByName = (rooms, roomName) => {
  return rooms.findIndex((room) => room.roomName === roomName);
};

const filteredRoomsById = (rooms, roomId) => {
  return rooms.filter((room) => room.roomId !== roomId);
};

const updateDevicesInRoom = (room, deviceId, updatedDevice) => {
  return {
    ...room,
    devices: room.devices.map((device) =>
      device.deviceId === deviceId ? { ...device, ...updatedDevice } : device
    ),
  };
};

export const roomSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {
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
      const { roomName, device } = action.payload;
      const roomIndex = findRoomIndexByName(state.rooms, roomName);
      if (roomIndex !== -1) {
        state.rooms[roomIndex] = updateDevicesInRoom(
          state.rooms[roomIndex],
          device.deviceId,
          device
        );
      }
    },
  },
});

export const { addRoom, deleteRoom, editRoom } = roomSlice.actions;

export default roomSlice.reducer;
