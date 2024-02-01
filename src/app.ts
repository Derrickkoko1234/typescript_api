// src/app.ts
import express from 'express';
import { createConnection } from 'typeorm';
import bodyParser from 'body-parser';
import authRoutes from './routes/auth.routes';
import contactRoutes from './routes/contact.routes';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

const app = express();

const PORT = process.env.PORT || 3000;

createConnection().then(() => {
  console.log('Connected to the database');

  app.use(bodyParser.json());
  app.use('/auth', authRoutes);
  app.use('/contact', contactRoutes);

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}).catch((error) => {
  console.error('Error connecting to the database:', error.message);
});
