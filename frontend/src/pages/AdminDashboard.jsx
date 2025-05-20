import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Input,
  Textarea,
  Button,
  VStack,
  HStack,
  Select,
} from "@chakra-ui/react";
import api from "../api";
import { format } from "date-fns";
import { toaster } from "@/components/ui/toaster";

const AdminDashboard = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    assignedTo: "",
    dueDate: "",
  });
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks");
      setTasks(res.data.tasks);
    } catch (err) {
      toaster.create({
        title: "Error fetching tasks",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreate = async () => {
    try {
      await api.post("/tasks", form);
      toaster.create({
        title: "Task created",
        status: "success",
        duration: 3000,
      });
      setForm({ title: "", description: "", assignedTo: "", dueDate: "" });
      fetchTasks();
    } catch (err) {
      toaster.create({
        title: err.message || "Error creating task",
        status: "error",
        duration: 3000,
      });
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <Box p={6}>
      <Heading mb={4}>Admin Dashboard</Heading>

      <VStack spacing={4} mb={8} align="stretch">
        <Input
          placeholder="Task Title"
          name="title"
          value={form.title}
          onChange={handleChange}
        />
        <Textarea
          placeholder="Description"
          name="description"
          value={form.description}
          onChange={handleChange}
        />
        <Input
          placeholder="Assigned To (email)"
          name="assignedTo"
          value={form.assignedTo}
          onChange={handleChange}
        />
        <Input
          type="date"
          name="dueDate"
          value={form.dueDate}
          onChange={handleChange}
        />
        <Button colorScheme="teal" onClick={handleCreate}>
          Create Task
        </Button>
      </VStack>

      <Heading size="md" mb={2}>
        Existing Tasks
      </Heading>
      {tasks.map((task) => (
        <Box key={task._id} borderWidth="1px" p={4} mb={2} rounded="md">
          <HStack justify="space-between">
            <Box>
              <strong>{task.title}</strong> – <i>{task.status}</i>
              <Box fontSize="sm" color="gray.500">
                Due: {format(task.dueDate, "PPpp")}
              </Box>
            </Box>
          </HStack>
          <Box mt={2}>{task.description}</Box>
        </Box>
      ))}
    </Box>
  );
};

export default AdminDashboard;
