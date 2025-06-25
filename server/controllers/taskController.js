import TaskModel from '../models/Task.js';
import asyncHandler from 'express-async-handler';

/********** Creating new task *********/
export const createTask = asyncHandler(async (req, res) => {
  const { title, completed } = req.body;
  if (!title || typeof title !== 'string') {
    return res.status(400).json({ message: 'Title is required and must be a string' });
  }

  try {
    const newTask = new TaskModel({
      title,
      completed
    });
    const savedTask = await newTask.save();
    res.status(201).json({ message: "Task created successfully", task: savedTask });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Failed to create task" });
  }
});

/********** Getting all tasks *********/
export const getAllTasks = asyncHandler(async (req, res) => {
  try {
    const allTasks = await TaskModel.find().sort({ createdAt: -1 });
    res.status(200).json({ message: "Tasks fetched successfully", tasks: allTasks });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
});


/********** Updating task *********/
export const updateTaskCompleted = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  if (typeof completed !== 'boolean') {
    return res.status(400).json({ message: "'completed' must be a boolean" });
  }
  try {
    const updatedTask = await TaskModel.findById(id);
    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    updatedTask.completed = completed;
    const updatedNewTask = await updatedTask.save();
    res.status(200).json({ message: 'Task updated successfully', task: updatedNewTask });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update task' });
  }
});

/********** Deleting task *********/
export const deleteTask = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const task = await TaskModel.findById(id)
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    await TaskModel.findByIdAndDelete(id)
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete task" });
  }
});   