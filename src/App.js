import React, { useEffect, useState } from "react";
import { ColorModeContext, useMode } from "./Theme.js";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import SideDrawer from "./components/Global/SideDrawer.jsx";
import Dashboard from "./components/Dashboard/Dashboard.jsx";
import RoomDetails from "./components/Rooms/RoomDetails.jsx";
import Settings from "./components/Settings/Settings.jsx";
import RoomsPage from "./components/Rooms/RoomsPage.jsx";
import Device from "./components/RoomDevices/Device.jsx";
import Signup from "./components/SignUpPage/Signup.jsx";
import AboutUs from "./components/AboutUs/AboutUs.jsx";
import Homepage from "./components/Home/Homepage.jsx";
import Login from "./components/LoginPage/Login.jsx";
import AddRoom from "./components/Rooms/AddRoom.jsx";
import Room from "./components/Rooms/Room.jsx";
import Contacts from "./Scenes/Contacts.jsx";

import Top from "./components/Global/Top.jsx";
import Finances from "./components/Finances/Finances.jsx";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const [userEmail, setUserEmail] = useState(() => {
    const storedUserEmail = window.localStorage.getItem("userEmail");
    return storedUserEmail || "";
  });
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const storedIsLoggedIn = window.localStorage.getItem("isLoggedIn");
    return storedIsLoggedIn ? JSON.parse(storedIsLoggedIn) : false;
  });

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token) {
      const loginTime = JSON.parse(window.localStorage.getItem("loginTime"));
      const expirationTime = 8 * 60 * 60 * 1000; // 8 hours in milliseconds

      if (loginTime && Date.now() - loginTime < expirationTime) {
        setIsLoggedIn(true);
        setUserEmail(window.localStorage.getItem("userEmail"));
      } else {
        handleLogout();
      }
    }
  }, []);

  const loginHandler = (email, token) => {
    window.localStorage.setItem("loginTime", JSON.stringify(Date.now()));
    window.localStorage.setItem("isLoggedIn", JSON.stringify(true));
    window.localStorage.setItem("userEmail", email);
    setUserEmail(email);
    setIsLoggedIn(true);
  };

  // logout function
  const handleLogout = () => {
    setIsLoggedIn(false);
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("loginTime");
    window.localStorage.removeItem("isLoggedIn");
    window.localStorage.removeItem("userEmail");
  };

  // routers function for handling the login and not show the whole page when a user
  // is not connected
  const renderRouterPaths = () => {
    if (!isLoggedIn) {
      return (
        <>
          <Route path="/login" element={<Login onLogin={loginHandler} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </>
      );
    } else {
      return (
        <>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/home" element={<Homepage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/roomDetails" element={<RoomDetails />} />
          <Route path="/roomsPage" element={<RoomsPage />} />
          <Route path="/addRoom" element={<AddRoom />} />
          <Route path="/room" element={<Room />} />
          <Route path="/device" element={<Device />} />
          <Route path="/aboutUs" element={<AboutUs />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/finances" element={<Finances />} />
          <Route path="/settings" element={<Settings />} />
        </>
      );
    }
  };

  // render top header route with the sidebar
  const renderTopHeader = () => {
    if (isLoggedIn) {
      return <SideDrawer isLoggedIn={isLoggedIn} onLogout={handleLogout} />;
    } else {
      return null;
    }
  };
  return (
    <BrowserRouter>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app" style={{ display: "flex", height: "100vh" }}>
            {renderTopHeader()}
            <main className="content" style={{ flex: 1 }}>
              {isLoggedIn && <Top setIsSidebar={setIsSidebarOpen} />}
              <Routes>{renderRouterPaths()}</Routes>
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </BrowserRouter>
  );
}

export default App;
