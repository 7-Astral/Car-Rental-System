import React, { useReducer, useContext } from "react";
import reducer from "./reducer";

export const user = localStorage.getItem("user");

const initialState = {
  showAlert: false,
  alertText: "",
  showSidebar: false,
  user: user ? JSON.parse(user) : null,
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ ...state }}>{children}</AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
