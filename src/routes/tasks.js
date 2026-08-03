import express from 'express';
import requireAuth from '../middleware/requireAuth.js';
import { memoryDB } from '../memoryDB.js';

const router = express.Router();

// Create task
router.post('/:listId', requireAuth, (req, res) => {
  const { title, description, priority, due_date, position } = req.body;
  const { listId } = req.params;

  const newTask = {
    id: Date.now(), // simple unique ID
    list_id: parseInt(listId),
    title,
    description,
    priority,
    due_date,
    position
  };

  memoryDB.tasks.push(newTask);

  res.json(newTask);
});

// Get tasks for list
router.get('/:listId', requireAuth, (req, res) => {
  const { listId } = req.params;

  const tasks = memoryDB.tasks
    .filter(t => t.list_id === parseInt(listId))
    .sort((a, b) => a.position - b.position);

  res.json(tasks);
});

// Move task (drag & drop)
router.patch('/tasks/:taskId/move', (req, res) => {
  const { taskId } = req.params;
  const { toListId, position } = req.body;

  const task = memoryDB.tasks.find(t => t.id === parseInt(taskId));

  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }

  task.list_id = parseInt(toListId);
  task.position = position;

  res.json(task);
});

export default router;

