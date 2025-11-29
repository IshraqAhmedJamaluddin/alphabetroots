import express from 'express';
import { pool } from '../config/database';

const router = express.Router();

// Get cart items
router.get('/:sessionId', async (req, res) => {
  try {
    const { sessionId } = req.params;
    const result = await pool.query(
      `SELECT ci.*, p.name, p.price, p.image_url 
       FROM cart_items ci 
       JOIN products p ON ci.product_id = p.id 
       WHERE ci.session_id = $1 
       ORDER BY ci.created_at DESC`,
      [sessionId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ error: 'Failed to fetch cart' });
  }
});

// Add item to cart
router.post('/:sessionId', async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { productId, quantity } = req.body;

    // Check if item already exists
    const existing = await pool.query(
      'SELECT * FROM cart_items WHERE session_id = $1 AND product_id = $2',
      [sessionId, productId]
    );

    if (existing.rows.length > 0) {
      // Update quantity
      const result = await pool.query(
        'UPDATE cart_items SET quantity = quantity + $1 WHERE session_id = $2 AND product_id = $3 RETURNING *',
        [quantity || 1, sessionId, productId]
      );
      return res.json(result.rows[0]);
    } else {
      // Insert new item
      const result = await pool.query(
        'INSERT INTO cart_items (session_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *',
        [sessionId, productId, quantity || 1]
      );
      return res.json(result.rows[0]);
    }
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ error: 'Failed to add item to cart' });
  }
});

// Update cart item quantity
router.put('/:sessionId/:itemId', async (req, res) => {
  try {
    const { sessionId, itemId } = req.params;
    const { quantity } = req.body;

    const result = await pool.query(
      'UPDATE cart_items SET quantity = $1 WHERE id = $2 AND session_id = $3 RETURNING *',
      [quantity, itemId, sessionId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Cart item not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating cart:', error);
    res.status(500).json({ error: 'Failed to update cart item' });
  }
});

// Remove item from cart
router.delete('/:sessionId/:itemId', async (req, res) => {
  try {
    const { sessionId, itemId } = req.params;
    await pool.query(
      'DELETE FROM cart_items WHERE id = $1 AND session_id = $2',
      [itemId, sessionId]
    );
    res.json({ message: 'Item removed from cart' });
  } catch (error) {
    console.error('Error removing from cart:', error);
    res.status(500).json({ error: 'Failed to remove item from cart' });
  }
});

// Clear cart
router.delete('/:sessionId', async (req, res) => {
  try {
    const { sessionId } = req.params;
    await pool.query('DELETE FROM cart_items WHERE session_id = $1', [sessionId]);
    res.json({ message: 'Cart cleared' });
  } catch (error) {
    console.error('Error clearing cart:', error);
    res.status(500).json({ error: 'Failed to clear cart' });
  }
});

export default router;

