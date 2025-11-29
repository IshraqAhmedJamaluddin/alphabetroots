import express from 'express';
import { pool } from '../config/database';

const router = express.Router();

// Get all stories
router.get('/', async (req, res) => {
  try {
    const { featured } = req.query;
    let query = 'SELECT * FROM stories';
    const params: any[] = [];

    if (featured === 'true') {
      query += ' WHERE featured = $1';
      params.push(true);
    }

    query += ' ORDER BY created_at DESC';

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching stories:', error);
    res.status(500).json({ error: 'Failed to fetch stories' });
  }
});

// Get single story
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM stories WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Story not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching story:', error);
    res.status(500).json({ error: 'Failed to fetch story' });
  }
});

export default router;

