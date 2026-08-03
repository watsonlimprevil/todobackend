import express from 'express';
import { pool } from '../db.js';
import requireAuth from '../middleware/requireAuth.js';

const router = express.Router();

// Create task
router.post('/:listId', requireAuth, async (req, res) => {
  const { title, description, priority, due_date, position } = req.body;
  const { listId } = req.params;

  try {
    const result = await pool.query(
      `INSERT INTO tasks (list_id, title, description, priority, due_date, position)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [listId, title, description, priority, due_date, position]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'server error' });
  }
});

// Get tasks for list
router.get('/:listId', requireAuth, async (req, res) => {
  const { listId } = req.params;

  try {
    const result = await pool.query(
      `SELECT * FROM tasks WHERE list_id = $1 ORDER BY position ASC`,
      [listId]
    );

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'server error' });
  }
});

export default router;
