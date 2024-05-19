// routes.js
import { Router } from 'express';
import { handleImageUpload } from './handlers'; // Assuming you have a handler function for image uploads

const router = Router();

router.post('/api/upload', handleImageUpload);

export default router;