const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
    title: String,
    description: String,
    assignedTo: String,
    dueDate: Date,
    status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
    createdAt: { type: Date, default: Date.now }
});

const taskModel = mongoose.model("Task", TaskSchema);
module.exports = taskModel;