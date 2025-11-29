import express from 'express';
import { pool } from '../config/database';

const router = express.Router();

// Get all gallery images
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    let query = 'SELECT * FROM gallery_images';
    const params: any[] = [];

    if (category) {
      query += ' WHERE category = $1';
      params.push(category);
    }

    query += ' ORDER BY display_order ASC, created_at DESC';

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching gallery images:', error);
    res.status(500).json({ error: 'Failed to fetch gallery images' });
  }
});

export default router;

