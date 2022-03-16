import { Router } from 'express';
import searchDataRoutes from './searchData.route';

const router = Router();

router.use('/search', searchDataRoutes);

export default router; 