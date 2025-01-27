# Starfleet Task Manager

## Overview

Starfleet Task Manager is a real-time task collaboration app inspired by Star Trek. The app allows users to manage tasks in a shared environment with specific roles:

- **Commanding Officers (Managers):** Can add tasks, delete tasks, and add bullet points to tasks.
- **Starfleet Officers (Employees):** Can add bullet points to tasks but cannot delete tasks.

This application uses **React** for the frontend, **Socket.IO** for real-time communication, and a simple in-memory backend server for handling tasks and user roles.

## Features

1. **User Roles:**
   - Commanding Officers (Managers): Add, delete, and update tasks.
   - Starfleet Officers (Employees): Update tasks by adding bullet points.
2. **Real-Time Updates:**
   - All tasks and updates are synced across connected clients using Socket.IO.
3. **Task Management:**
   - Add tasks.
   - Add bullet points to tasks.
   - Delete tasks (Manager-only).
4. **Responsive Design:**
   - Tasks are displayed in a grid layout with responsive columns for mobile, tablet, and desktop views.
5. **Star Trek Theme:**
   - Styled with Tailwind CSS to reflect a futuristic Star Trek aesthetic.

## Tech Stack

- **Frontend:** React, Tailwind CSS, Socket.IO-Client
- **Backend:** Node.js, Express, Socket.IO

## Getting Started

Go to https://stngtask.netlify.app/ or...

### Prerequisites

Ensure you have the following installed:

- Node.js (>= 16)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/starfleet-task-manager.git
   cd starfleet-task-manager
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Start the Server

1. Navigate to the project directory.
2. Run the server:
   ```bash
   npm run start:server
   ```
   The server will start at `http://localhost:3001`.

### Start the Frontend

1. In another terminal, start the frontend:
   ```bash
   npm run dev
   ```
2. Open your browser and go to `http://localhost:5173`.

## Usage

### Logging In

1. Enter one of the following usernames and use `123` as the password:
   - **Managers:** `data`, `riker`
   - **Employees:** `laforge`, `worf`

### Adding Tasks

- **Managers Only:** Use the "Add Task" form to add a task. Tasks will appear in a grid layout on the main screen.

### Adding Bullet Points

- **All Users:** Use the input box below each task to add a bullet point.

### Deleting Tasks

- **Managers Only:** Click the "Delete" button on a task to remove it.

### Real-Time Updates

- Any changes made by one user will be immediately reflected on all connected clients.

## Project Structure

```
starfleet-task-manager/
├── public/
├── src/
│   ├── components/
│   │   ├── AddTask.jsx        # Component for adding tasks
│   │   ├── CurrentTasks.jsx   # Component for displaying tasks
│   ├── context/
│   │   ├── UserContext.jsx    # Context for user and task state
│   ├── pages/
│   │   ├── Home.jsx           # Main task management page
│   │   ├── Login.jsx          # Login page
│   ├── App.jsx                # Main app file
│   ├── main.jsx               # Entry point
├── server.js                  # Backend server with Socket.IO
├── package.json               # Project metadata and scripts
```

## Scripts

### Start the Server

```bash
npm run start:server
```

### Start the Frontend

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

## Future Enhancements

Here are some potential future enhancements for the Starfleet Task Manager to make it even more powerful and user-friendly:

1. **Task Completion Checkmarks:**
   - Add a checkbox to each task or bullet point to mark it as completed. Once checked, the task or bullet point could be visually crossed out or dimmed to indicate completion.

2. **Subtasks and Nested Tasks:**
   - Allow users to convert bullet points into subtasks, creating a hierarchical structure for more complex task management.
   - Enable dragging and dropping tasks or subtasks to reorder them or move them under different parent tasks.

3. **Task Prioritization:**
   - Add the ability to assign priority levels (e.g., Low, Medium, High) to tasks, with visual indicators like colored labels or icons.

4. **Task Deadlines and Reminders:**
   - Introduce due dates for tasks and subtasks, with optional reminders or notifications as deadlines approach.

5. **Task Categories or Tags:**
   - Allow users to categorize tasks using tags or labels (e.g., "fron end," "backend," "Urgent") for better organization and filtering.

6. **Task Comments and Collaboration:**
   - Add a commenting system to tasks, enabling users to discuss specific tasks or provide additional context.

7. **Task History and Audit Logs:**
   - Implement a history log that tracks changes made to tasks (e.g., who added, updated, or deleted a task) for accountability and transparency.

8. **Advanced Search and Filtering:**
   - Add a search bar and filtering options to quickly find tasks by keywords, tags, priority, or due date.

9. **Accessibility Improvements:**
    - Ensure the app is fully accessible by following WCAG guidelines, including keyboard navigation and screen reader support.

10. **Task Templates:**
    - Allow users to create and save task templates for recurring workflows or projects.



## License

This project is licensed under the MIT License. See the LICENSE file for details.

---

Enjoy managing your tasks like a true Starfleet officer! 🚀
