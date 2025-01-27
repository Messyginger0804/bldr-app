import express from "express";
import { Server } from "socket.io";
import http from "http";
import cors from "cors";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());

const users = [
  { username: "data", password: "123", role: "manager" },
  { username: "riker", password: "123", role: "manager" },
  { username: "laforge", password: "123", role: "employee" },
  { username: "worf", password: "123", role: "employee" },
];

const DEFAULT_TASKS = [
  {
    id: "1",
    title: "Prime Directive",
    completed: false,
    bullets: [
      "Do not interfere with the natural development of alien civilizations.",
      "Avoid revealing advanced technology to less developed species.",
      "Respect the sovereignty of other cultures.",
    ],
  },
  {
    id: "2",
    title: "Make Ice for Star Trek",
    completed: false,
    bullets: [
      "Replicate ice cubes for the crew's beverages.",
      "Ensure the ice is crystal clear and free of impurities.",
      "Deliver ice to the bridge, engineering, and Ten Forward.",
    ],
  },
];

let tasks = [...DEFAULT_TASKS];

io.on("connection", (socket) => {
  console.log(`[Connection] User connected: ${socket.id}`);

  socket.on("login", ({ username, password }) => {
    console.log(`[Login Attempt] Username: ${username}, Password: ${password}`);
    const user = users.find((u) => u.username === username && u.password === password);

    if (user) {
      console.log(`[Login Success] ${username} logged in as ${user.role}`);
      socket.emit("loginSuccess", { username: user.username, role: user.role });
      socket.emit("tasksUpdated", tasks);
    } else {
      console.log(`[Login Failed] Invalid login attempt by ${username}`);
      socket.emit("loginFailure", { message: "Invalid username or password" });
    }
  });

  socket.on("addTask", (task) => {
    tasks.push(task);
    console.log(`[Add Task] Task added:`, task);
    console.log(`[Current Tasks]`, tasks);
    io.emit("tasksUpdated", tasks);
  });


  socket.on("addBullet", ({ taskId, bullet }) => {
    tasks = tasks.map((task) =>
      task.id === taskId ? { ...task, bullets: [...task.bullets, bullet] } : task
    );
    console.log(`[Add Bullet] Bullet added to task ID ${taskId}: "${bullet}"`);
    console.log(`[Current Tasks]`, tasks);
    io.emit("tasksUpdated", tasks);
  });


  socket.on("getTasks", () => {
    console.log(`[Get Tasks] Sending current tasks to user: ${socket.id}`);
    socket.emit("tasksUpdated", tasks);
  });

  socket.on("deleteTask", (taskId) => {
    if (DEFAULT_TASKS.some((task) => task.id === taskId)) {
      console.log(`[Delete Task] Attempt to delete default task ID ${taskId} blocked`);
      return;
    }

    const deletedTask = tasks.find((task) => task.id === taskId);
    tasks = tasks.filter((task) => task.id !== taskId);
    console.log(`[Delete Task] Task deleted:`, deletedTask);
    console.log(`[Current Tasks]`, tasks);
    io.emit("tasksUpdated", tasks);
  });

  socket.on("disconnect", () => {
    console.log(`[Disconnection] User disconnected: ${socket.id}`);
  });
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`[Server] Running on http://localhost:${PORT}`);
  console.log(`[Initial Tasks]`, tasks);
});