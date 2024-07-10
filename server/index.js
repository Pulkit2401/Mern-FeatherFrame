import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js';
import replicateRoutes from './routes/replicateRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.use('/api/v1/post', postRoutes);
app.use('/api/v1/replicate', replicateRoutes);

app.get('/', async (req, res) => {
  res.status(200).json({
    message: 'Hello from Image Generator!',
  });
});

const startServer = async () => {
  try {
    await connectDB(process.env.MONGODB_URL); // Ensure the connection is awaited
    app.listen(8080, () => {
      console.log('Server started on port 8080');
    });
  } catch (error) {
    console.error('Failed to start server:', error);
  }
};

startServer();
