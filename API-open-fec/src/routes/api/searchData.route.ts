import { Router } from 'express';
import * as Search from '../../controller/search'

const router = Router();

router.route('/')
    .get(Search.findCand);

export default router; 