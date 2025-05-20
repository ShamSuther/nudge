import React from "react";
import { format } from "date-fns";

const TaskCard = ({ task, onStatusChange }) => {
  return (
    <div className="task-card">
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p>Due: {format(task.dueDate, "PPpp")}</p>
      <p>Status: {task.status}</p>

      {task.status === "pending" && (
        <button onClick={() => onStatusChange(task._id)}>Mark Completed</button>
      )}
    </div>
  );
};

export default TaskCard;
