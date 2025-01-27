import { useAppContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import AddTask from "../components/AddTask";
import CurrentTasks from "../components/CurrentTasks";
import { useEffect } from "react";

const Home = ({ socket }) => {
  const { user, setUser, tasks, setTasks } = useAppContext();
  const navigate = useNavigate();

  // Fetch tasks from the backend when the component mounts or when the socket changes
  useEffect(() => {
    if (socket) {
      // Fetch tasks from the backend
      socket.emit("getTasks");

      // Listen for updates to tasks from the server
      socket.on("tasksUpdated", (updatedTasks) => {
        setTasks(updatedTasks);
      });

      // Cleanup socket listeners when the component unmounts
      return () => {
        socket.off("tasksUpdated");
      };
    }
  }, [socket, setTasks]);

  const handleLogout = () => {
    setUser({ username: "", role: "employee" }); // Reset user state
    navigate("/");
  };

  const handleAddTask = (title) => {
    const newTask = {
      id: Date.now().toString(),
      title,
      completed: false,
      bullets: [],
    };
    socket.emit("addTask", newTask);
  };

  const handleAddBullet = (taskId, bullet) => {
    socket.emit("addBullet", { taskId, bullet });
  };

  const handleDeleteTask = (taskId) => {
    socket.emit("deleteTask", taskId);
  };

  const userRole = user.role || "employee"; // Fallback role

  return (
    <div className="h-screen bg-gradient-to-r from-black to-gray-900 text-white p-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">
          Welcome, {user.username || "Guest"}! (
          {userRole === "manager" ? "Commanding Officer" : "Starfleet Officer"})
        </h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg font-bold"
        >
          Log Out
        </button>
      </header>

      <main>
        {userRole === "manager" && <AddTask onAddTask={handleAddTask} />}
        <CurrentTasks
          tasks={tasks}
          role={userRole}
          onAddBullet={handleAddBullet}
          onDeleteTask={handleDeleteTask}
        />
      </main>
    </div>
  );
};

export default Home;