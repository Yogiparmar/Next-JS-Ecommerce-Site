import { createContext, useState, useEffect } from "react";

export const UserContext = createContext({});

export default function UserContexProvider({ children }) {
  const ls = typeof window !== "undefined" ? window.localStorage : null;

  // State for user data
  const [userData, setUserData] = useState(null);

  // Load user data from localStorage on component mount
  useEffect(() => {
    const storedUserData = ls?.getItem("project_X");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  // Function to set user data to localStorage
  const setUserDataToStorage = (data) => {
    if (ls) {
      ls.setItem("project_X", JSON.stringify(data));
    }
    setUserData(data);
  };

  // Function to remove user data from localStorage
  const removeUserDataFromStorage = () => {
    if (ls) {
      ls.removeItem("project_X");
    }
    setUserData(null);
  };

  return (
    <UserContext.Provider
      value={{
        userData,
        setUserData: setUserDataToStorage,
        removeUserData: removeUserDataFromStorage,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
