import { Router } from 'express';
import SearchDataController from '../../controller/search';

const router = Router();
const searchDataController = new SearchDataController();

router.route('/')
    .get(searchDataController.getCandidates)

export default router; 