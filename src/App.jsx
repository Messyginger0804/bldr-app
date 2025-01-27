import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/UserContext";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const App = () => {
  const [socket, setSocket] = useState(null);
  const { user, setUser, tasks, setTasks, newTask } = useAppContext();

  useEffect(() => {
    const newSocket = io("http://localhost:3001");
    setSocket(newSocket);
    socket.emit("addTask", newTask);


    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login socket={socket} />} />
          <Route path="/home" element={<Home socket={socket} />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
};

export default App;