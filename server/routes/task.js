import express from 'express';
import { createTask, deleteTask, getAllTasks, updateTaskCompleted } from '../controllers/taskController.js';
const router = express.Router();

// @ /api/tasks 
router.post('/', createTask);

// @ /api/tasks
router.get('/', getAllTasks);

// @ /api/tasks/124
router.put('/:id', updateTaskCompleted);

// @ /api/tasks/124
router.delete('/:id', deleteTask);

export default router;