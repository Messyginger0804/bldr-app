import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/UserContext";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useAppContext();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const mockUsers = {
      data: "manager",
      riker: "manager",
      worf: "employee",
      laforge: "employee",
    };

    if (mockUsers[username] && password === "123") {
      setUser({ username, role: mockUsers[username] });
      navigate("/home");
    } else {
      alert("Invalid login credentials");
    }
  };

  return (
    <div className="h-screen bg-gradient-to-r from-black to-gray-700 flex justify-center items-center text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-2xl w-full max-w-md border border-blue-500">
        <h1 className="text-4xl font-bold text-center text-blue-500 mb-8">
          Starfleet Login
        </h1>
        <form onSubmit={handleLogin} className="flex flex-col gap-4 drop-shadow-lg">
          <input
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="bg-gray-700 text-white px-4 py-2 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-gray-700 text-white px-4 py-2 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded font-bold text-white transition duration-300"
          >
            Login
          </button>
        </form>
        <p className="text-center text-sm text-blue-500 mt-4">
          🚀 Engage to explore your tasks!
        </p>
      </div>
    </div>
  );
};

export default Login;