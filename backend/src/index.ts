import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { pool } from './config/database';

// Import routes
import productsRouter from './routes/products';
import cartRouter from './routes/cart';
import storiesRouter from './routes/stories';
import galleryRouter from './routes/gallery';
import contactRouter from './routes/contact';
import ordersRouter from './routes/orders';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Alphabetroots API is running' });
});

// Routes
app.use('/api/products', productsRouter);
app.use('/api/cart', cartRouter);
app.use('/api/stories', storiesRouter);
app.use('/api/gallery', galleryRouter);
app.use('/api/contact', contactRouter);
app.use('/api/orders', ordersRouter);

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Start server
app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  
  // Test database connection
  try {
    const client = await pool.connect();
    console.log('Database connected successfully');
    client.release();
  } catch (error) {
    console.error('Database connection error:', error);
  }
});

export default app;

