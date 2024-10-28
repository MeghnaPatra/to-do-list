// server/routes/tasks.js
const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Create Task
router.post('/task', async (req, res) => {
  const { title, description, frequency, interval, start_date, end_date } = req.body;
  try {
    const result = await db.one(
      'INSERT INTO tasks(title, description, frequency, interval, start_date, end_date) VALUES($1, $2, $3, $4, $5, $6) RETURNING *',
      [title, description, frequency, interval, start_date, end_date]
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get All Tasks
router.get('/tasks', async (req, res) => {
  try {
    const tasks = await db.any('SELECT * FROM tasks');
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update Task
router.put('/task/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, frequency, interval, start_date, end_date } = req.body;
  try {
    const result = await db.one(
      'UPDATE tasks SET title=$1, description=$2, frequency=$3, interval=$4, start_date=$5, end_date=$6 WHERE id=$7 RETURNING *',
      [title, description, frequency, interval, start_date, end_date, id]
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete Task
router.delete('/task/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.none('DELETE FROM tasks WHERE id=$1', [id]);
    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
