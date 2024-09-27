import { useEffect, useState } from "react";

const useApp = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const [useEmail, setUserEmail] = useState(() => {
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
      let todayDate = Date.now();
      const loginTime = JSON.parse(window.localStorage.getItem("loginTime"));
      const expirationLoginTime = 8 * 60 * 60 * 1000;

      if (loginTime && todayDate - loginTime < expirationLoginTime) {
        setIsLoggedIn(true);
        setUserEmail(window.localStorage.getItem("userEmail"));
      } else {
        handleLogout();
      }
    }
  }, []);

  const handleLogin = (email) => {
    let todayDate = Date.now();

    window.localStorage.setItem("loginTime", JSON.stringify(todayDate));
    window.localStorage.setItem("isLoggedIn", JSON.stringify(true));
    window.localStorage.setItem("userEmail", email);

    setUserEmail(email);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);

    window.localStorage.removeItem("token");
    window.localStorage.removeItem("loginTime");
    window.localStorage.removeItem("isLoggedIn");
    window.localStorage.removeItem("userEmail");
  };

  return {
    handleLogin,
    handleLogout,
    isLoggedIn,
    isSidebarOpen,
    setIsSidebarOpen,
    useEmail,
  };
};

export default useApp;
