import { useState } from "react";
import PropTypes from "prop-types";

const AddTask = ({ onAddTask }) => {
  const [taskTitle, setTaskTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskTitle.trim()) {
      onAddTask(taskTitle);
      setTaskTitle("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-4 mb-8">
      <input
        type="text"
        placeholder="Task Title"
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
        className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg font-bold text-lg text-white"
      >
        Add Task
      </button>
    </form>
  );
};

AddTask.propTypes = {
  onAddTask: PropTypes.func.isRequired,
};

export default AddTask;
