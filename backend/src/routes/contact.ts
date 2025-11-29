import express from 'express';
import { body, validationResult } from 'express-validator';
import { pool } from '../config/database';

const router = express.Router();

// Submit contact form
router.post(
  '/',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('message').trim().notEmpty().withMessage('Message is required'),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { name, email, phone, subject, message } = req.body;

      const result = await pool.query(
        'INSERT INTO contact_messages (name, email, phone, subject, message) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [name, email, phone || null, subject || null, message]
      );

      res.status(201).json({
        message: 'Contact message submitted successfully',
        data: result.rows[0],
      });
    } catch (error) {
      console.error('Error submitting contact form:', error);
      res.status(500).json({ error: 'Failed to submit contact message' });
    }
  }
);

export default router;

