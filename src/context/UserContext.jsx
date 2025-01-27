import { createContext, useContext, useState } from "react";

// Create the context
const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

// Context provider
export const AppProvider = ({ children }) => {
  const [user, setUser] = useState({
    username: "",
    role: "employee",
  });

  const [tasks, setTasks] = useState([]);

  return (
    <AppContext.Provider value={{ user, setUser, tasks, setTasks }}>
      {children}
    </AppContext.Provider>
  );
};
