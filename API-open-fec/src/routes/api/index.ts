import { Router } from 'express';
import SearchDataRoutes from './searchData.route'

const router = Router();

router.use('/search', SearchDataRoutes);

export default router; 