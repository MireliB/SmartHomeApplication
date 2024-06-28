import React, { useEffect, useState } from "react";
import { ColorModeContext, useMode } from "./Theme.js";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

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
import User from "./Models/User.js";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const [user, setUser] = useState(() => {
    const email = localStorage.getItem("userEmail");
    return email ? new User(email) : null;
  });

  const [isLoggedIn, setIsLoggedIn] = useState(
    user ? user.isLoggedIn() : false
  );

  // a useEffect for user token
  useEffect(() => {
    if (user && user.isLoggedIn()) {
      setIsLoggedIn(true);
    } else {
      handleLogout();
    }
  }, [user]);

  const loginHandler = (email, token) => {
    const newUser = new User(email);
    newUser.login(token);
    setUser(newUser);
    setIsLoggedIn(true);
  };

  // logout function
  const handleLogout = () => {
    if (user) {
      user.logout();
      setUser(null);
      setIsLoggedIn(false);
    }
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
          <Route path="/roomsPage" element={<RoomsPage />} />
          <Route path="/addRoom" element={<AddRoom />} />
          <Route path="/room" element={<Room />} />
          <Route path="/device" element={<Device />} />
          <Route path="/aboutUs" element={<AboutUs />} />
          <Route path="/contacts" element={<Contacts />} />
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
