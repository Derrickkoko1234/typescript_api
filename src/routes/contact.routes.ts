// src/routes/contact.routes.ts
import { Router } from 'express';
import { addContact } from '../controllers/contact.controller';
import { authenticateUser } from '../middlewares/token';

const router = Router();

router.post('/add', authenticateUser, addContact);

export default router;
