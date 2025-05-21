import React, { useEffect, useState } from "react";
import api from "../api";
import TaskCard from "../components/TaskCard";
import { toaster } from "@/components/ui/toaster";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks");
      setTasks(res.data.tasks);
    } catch (err) {
      toaster.create({
        title: "Error",
        description: err.message || "Error fetching the tasks",
        type: "error",
      });
    }
  };

  const markComplete = async (id) => {
    try {
      await api.patch(`/tasks/${id}/status`, { status: "completed" });
      toaster.create({
        title: "Error",
        description: "Task marked as completed",
        type: "success",
      });
      fetchTasks();
    } catch (err) {
      toaster.create({
        title: "Error",
        description: err.message || "Task marked as completed",
        type: "success",
      });
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  if (tasks.length > 0) {
    return (
      <div className="dashboard">
        <h2>Intern Tasks</h2>
        {tasks.map((task) => (
          <TaskCard key={task._id} task={task} onStatusChange={markComplete} />
        ))}
      </div>
    );
  }
  
  return (
    <div className="dashboard">
      <h2>Intern Tasks</h2>
      <p>No tasks found!</p>
    </div>
  );
};

export default Dashboard;
