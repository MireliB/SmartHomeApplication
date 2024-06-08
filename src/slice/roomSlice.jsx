//utility function for creating redux slices
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rooms: JSON.parse(window.localStorage.getItem("rooms")) || {},
};

const findRoomByIndexName = (rooms, roomName) => {
  return rooms.findIndex((room) => room.roomName === roomName);
};

const filteredRoomById = (room, roomId) => {
  return room.rooms.filter((room) => room.roomId !== roomId);
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
      const { roomName, room } = action.payload;
      const roomIndex = findRoomByIndexName(state.rooms, roomName);
      if (roomIndex !== -1) {
        const updateRooms = filteredRoomById(
          state.rooms[roomIndex],
          room.roomId
        );
        state.rooms[roomIndex].rooms = [...updateRooms];
      }
    },

    editRoom: (state, action) => {
      const { roomName, device } = action.payload;
      const roomIndex = findRoomByIndexName(state.rooms, roomName);
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
