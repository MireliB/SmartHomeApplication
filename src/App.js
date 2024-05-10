import React, { useState } from "react";
import { ColorModeContext, useMode } from "./Theme.js";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import SideDrawer from "./components/Global/SideDrawer.jsx";
import Dashboard from "./components/Dashboard/Dashboard.jsx";
import Top from "./components/Global/Top.jsx";
import Homepage from "./components/Home/Homepage.jsx";
import Login from "./components/LoginPage/Login.jsx";
import Signup from "./components/SignUpPage/Signup.jsx";
import RoomsPage from "./components/Rooms/RoomsPage.jsx";
import AddRoom from "./components/Rooms/AddRoom.jsx";
import Room from "./components/Rooms/Room.jsx";
import Device from "./components/RoomDevices/Device.jsx";
import AboutUs from "./components/AboutUs/AboutUs.jsx";
import Contacts from "./Scenes/Contacts.jsx";
import Settings from "./components/Settings/Settings.jsx";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [token, setToken] = useState();

  // if (!token) {
  //   return <Login setToken={setToken} />;
  // }
  return (
    <BrowserRouter>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app" style={{ flex: 1, height: "100vh" }}>
            <SideDrawer isSidebar={isSidebarOpen} />
            <main className="content">
              <Top setIsSidebar={setIsSidebarOpen} />

              <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/roomsPage" element={<RoomsPage />} />
                <Route path="/addRoom" element={<AddRoom />} />
                <Route path="/room" element={<Room />} />
                <Route pa th="/device" element={<Device />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/aboutUs" element={<AboutUs />} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </BrowserRouter>
  );
}

export default App;
