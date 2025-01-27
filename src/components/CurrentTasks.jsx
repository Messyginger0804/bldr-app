import PropTypes from "prop-types";
import { useState } from "react";

const CurrentTasks = ({ tasks, role, onDeleteTask, onAddBullet }) => {
  const [bulletInput, setBulletInput] = useState({});

  const handleAddBullet = (taskId) => {
    if (bulletInput[taskId]?.trim()) {
      onAddBullet(taskId, bulletInput[taskId]);
      setBulletInput({ ...bulletInput, [taskId]: "" });
    }
  };

  return (
    <section>
      <h2 className="text-3xl font-bold mb-6">Current Tasks</h2>
      {tasks.length === 0 ? (
        <p className="text-lg">No tasks available at the moment.</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task) => (
            <li key={task.id} className="p-6 bg-gray-800 rounded-lg shadow-lg">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold mb-2">{task.title}</h3>
                  <ul className="pl-4 list-disc text-base space-y-1">
                    {task.bullets.map((bullet, index) => (
                      <li key={index}>{bullet}</li>
                    ))}
                  </ul>
                </div>
                {role === "manager" && (
                  <button
                    onClick={() => onDeleteTask(task.id)}
                    className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg font-bold text-sm"
                  >
                    Delete
                  </button>
                )}
              </div>
              <div className="mt-4 flex gap-4">
                <input
                  type="text"
                  placeholder="Add a bullet point"
                  value={bulletInput[task.id] || ""}
                  onChange={(e) =>
                    setBulletInput({ ...bulletInput, [task.id]: e.target.value })
                  }
                  className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-base text-white w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={() => handleAddBullet(task.id)}
                  className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg font-bold text-sm mt-2"
                >
                  Add Bullet
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

CurrentTasks.propTypes = {
  tasks: PropTypes.array.isRequired,
  role: PropTypes.oneOf(["manager", "employee"]).isRequired,
  onDeleteTask: PropTypes.func.isRequired,
  onAddBullet: PropTypes.func.isRequired,
};

export default CurrentTasks;
