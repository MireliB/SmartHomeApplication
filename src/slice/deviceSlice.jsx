//utility function for creating redux slices
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  devices: [],
};

const findDeviceByIndexName = (device, deviceName) => {
  return device.findIndex((device) => device.deviceName === deviceName);
};

// filteres out the device from specific id from room.
// devices array, returns an array with filtered devices

const filteredDeviceFromRoom = (room, deviceId) => {
  return room.devices.filter((device) => device.deviceId !== deviceId);
};

const updateDevicesInRoom = (device, deviceId, updatedDevice) => {
  return {
    ...device,
    devices: device.devices.map((device) =>
      device.deviceId === deviceId ? { ...device, ...updatedDevice } : device
    ),
  };
};

export const deviceSlice = createSlice({
  name: "devices",
  initialState,
  reducers: {
    addDevice: (state, action) => {
      state.devices.push(action.payload);
    },

    deleteDevice: (state, action) => {
      const { deviceName, device } = action.payload;
      const deviceIndex = findDeviceByIndexName(state.devices, deviceName);
      if (deviceIndex !== -1) {
        const updateDevices = filteredDeviceFromRoom(
          state.devices[deviceIndex],
          device.deviceId
        );
        state.devices[deviceIndex].devices = [...updateDevices];
      }
    },

    editDevice: (state, action) => {
      const { deviceName, device } = action.payload;
      const deviceIndex = findDeviceByIndexName(state.devices, deviceName);
      if (deviceIndex !== -1) {
        state.devices[deviceIndex] = updateDevicesInRoom(
          state.devices[deviceIndex],
          device.deviceId,
          device
        );
      }
    },
  },
});

export const { addDevice, deleteDevices, editDevice } = deviceSlice.actions;

export default deviceSlice.reducer;
