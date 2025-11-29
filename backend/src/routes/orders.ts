import express from 'express';
import { body, validationResult } from 'express-validator';
import { pool } from '../config/database';

const router = express.Router();

// Create order
router.post(
  '/',
  [
    body('customerName').trim().notEmpty().withMessage('Customer name is required'),
    body('customerEmail').isEmail().withMessage('Valid email is required'),
    body('shippingAddress').trim().notEmpty().withMessage('Shipping address is required'),
    body('items').isArray({ min: 1 }).withMessage('At least one item is required'),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { customerName, customerEmail, customerPhone, shippingAddress, items, sessionId } = req.body;

      // Calculate total
      let totalAmount = 0;
      for (const item of items) {
        const productResult = await pool.query('SELECT price FROM products WHERE id = $1', [item.productId]);
        if (productResult.rows.length === 0) {
          return res.status(400).json({ error: `Product ${item.productId} not found` });
        }
        totalAmount += parseFloat(productResult.rows[0].price) * item.quantity;
      }

      // Generate order number
      const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

      // Create order
      const orderResult = await pool.query(
        `INSERT INTO orders (order_number, customer_name, customer_email, customer_phone, shipping_address, total_amount)
         VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
        [orderNumber, customerName, customerEmail, customerPhone || null, shippingAddress, totalAmount]
      );

      const order = orderResult.rows[0];

      // Create order items
      for (const item of items) {
        const productResult = await pool.query('SELECT name, price FROM products WHERE id = $1', [item.productId]);
        const product = productResult.rows[0];

        await pool.query(
          `INSERT INTO order_items (order_id, product_id, product_name, quantity, price)
           VALUES ($1, $2, $3, $4, $5)`,
          [order.id, item.productId, product.name, item.quantity, product.price]
        );
      }

      // Clear cart if sessionId provided
      if (sessionId) {
        await pool.query('DELETE FROM cart_items WHERE session_id = $1', [sessionId]);
      }

      res.status(201).json({
        message: 'Order created successfully',
        order: {
          ...order,
          items,
        },
      });
    } catch (error) {
      console.error('Error creating order:', error);
      res.status(500).json({ error: 'Failed to create order' });
    }
  }
);

// Get order by order number
router.get('/:orderNumber', async (req, res) => {
  try {
    const { orderNumber } = req.params;
    const orderResult = await pool.query('SELECT * FROM orders WHERE order_number = $1', [orderNumber]);

    if (orderResult.rows.length === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }

    const order = orderResult.rows[0];
    const itemsResult = await pool.query(
      'SELECT * FROM order_items WHERE order_id = $1',
      [order.id]
    );

    res.json({
      ...order,
      items: itemsResult.rows,
    });
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ error: 'Failed to fetch order' });
  }
});

export default router;

