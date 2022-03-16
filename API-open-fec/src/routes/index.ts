import { Router } from 'express';
import { RoutesInput } from '../types/types';
import apiRoutes from './api';

const router = Router();

router.use('/api', apiRoutes);

// router.use('/user', userRoutes); 

export default router; 