const mongoose = require('mongoose');
const Task = require('../models/Task');

// Get all tasks
const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, tasks });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to fetch tasks', error: err.message });
    }
};

// Create a new task
const createTask = async (req, res) => {
    const { title, description, assignedTo, dueDate } = req.body;

    if (!title || !assignedTo || !dueDate) {
        return res.status(400).json({
            success: false,
            message: 'Title, assignedTo, and dueDate are required fields',
        });
    }

    try {
        const task = new Task(req.body);
        await task.save();
        res.status(201).json({ success: true, task });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to create task', error: err.message });
    }
};

// Update task status
const updateTaskStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: 'Invalid task ID' });
    }

    if (!status || !['pending', 'completed'].includes(status)) {
        return res.status(400).json({ success: false, message: 'Invalid or missing status' });
    }

    try {
        const updatedTask = await Task.findByIdAndUpdate(id, { status }, { new: true });

        if (!updatedTask) {
            return res.status(404).json({ success: false, message: 'Task not found' });
        }

        res.status(200).json({ success: true, task: updatedTask });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to update task', error: err.message });
    }
};

module.exports = {
    getTasks,
    createTask,
    updateTaskStatus,
};