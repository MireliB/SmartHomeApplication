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

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  //a static JSON parsed string method, constructing js value or object by the string
  const storedLocation = JSON.parse(window.localStorage.getItem("location"));
  const initialLocation = storedLocation;
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    //stores the log in in localStorage
    const storedIsLoggedIn = window.localStorage.getItem("isLoggedIn");
    //if the storedLocation is ok then it stores the login, else it changes to false
    return storedLocation ? JSON.parse(storedIsLoggedIn) : false;
  });

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token) {
      const loginTime = JSON.parse(window.localStorage.getItem("loginTime"));
      // available for 9 hours until logout automatically
      const exparationLoginTime = 9 * 60 * 60 * 1000;
      if (loginTime && Date.now() - loginTime < exparationLoginTime) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("loginTime");
        window.localStorage.removeItem("isLoggedIn");
      }
    }
  }, []);

  //
  const storeLocation = () => {
    const location = window.location.pathname;
    window.localStorage.setItem("location", JSON.stringify(location));
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    window.localStorage.setItem("loginTime", JSON.stringify(Date.now()));
    window.localStorage.setItem("isLoggedIn", JSON.stringify(true));
  };

  // const handleLogOut = () => {
  //   setIsLoggedIn(false);
  //   window.localStorage.removeItem("token");
  //   window.localStorage.removeItem("loginTime");
  //   window.localStorage.removeItem("isLoggedIn");
  // };

  // const renderSidebar = () => {
  //   if (isLoggedIn) {
  //     return <SideDrawer isSidebar={isSidebarOpen} />;
  //   }
  // };

  // const renderTopHeader = () => {
  //   if (isLoggedIn) {
  //     return <Top setIsSidebar={setIsSidebarOpen} />;
  //   }
  // };

  // const renderRoutePaths = () => {
  //   if (!isLoggedIn) {
  //     return (
  //       <>
  //         {/* <Route path="/*" element={<Navigate to="/login" />} /> */}
  //         <Route
  //           path="/login"
  //           element={
  //             <Login onLogin={handleLogin} setIsLoggedIn={setIsLoggedIn} />
  //           }
  //         />
  //       </>
  //     );
  //   } else {
  //     return (
  //       <>
  //         <Route path="/" element={<Homepage />} />
  //         <Route
  //           path="/login"
  //           element={
  //             <Login onLogin={handleLogin} setIsLoggedIn={setIsLoggedIn} />
  //           }
  //         />
  //         <Route path="/signup" element={<Signup />} />
  //         <Route path="/roomsPage" element={<RoomsPage />} />
  //         <Route path="/addRoom" element={<AddRoom />} />
  //         <Route path="/room" element={<Room />} />
  //         <Route pa th="/device" element={<Device />} />
  //         <Route path="/dashboard" element={<Dashboard />} />
  //         <Route path="/aboutUs" element={<AboutUs />} />
  //         <Route path="/contacts" element={<Contacts />} />
  //         <Route path="/settings" element={<Settings />} />
  //       </>
  //     );
  //   }
  // };

  return (
    <BrowserRouter>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app" style={{ flex: 1, height: "100vh" }}>
            <SideDrawer isSidebar={isSidebarOpen} />
            <main className="content">
              <Top setIsSidebar={setIsSidebarOpen} />
              {/* {renderSidebar()} */}
              {/* {renderTopHeader()} */}
              <Routes location={initialLocation} onUpdate={storeLocation}>
                <Route path="/" element={<Homepage />} />
                <Route
                  path="/login"
                  element={
                    <Login
                      onLogin={handleLogin}
                      setIsLoggedIn={setIsLoggedIn}
                    />
                  }
                />
                <Route path="/signup" element={<Signup />} />
                <Route path="/roomsPage" element={<RoomsPage />} />
                <Route path="/addRoom" element={<AddRoom />} />
                <Route path="/room" element={<Room />} />
                <Route pa th="/device" element={<Device />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/aboutUs" element={<AboutUs />} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/settings" element={<Settings />} />
                {/* {renderRoutePaths()} */}
              </Routes>
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </BrowserRouter>
  );
}

export default App;
