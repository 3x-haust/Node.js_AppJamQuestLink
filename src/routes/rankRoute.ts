import express from 'express';
const router = express.Router();
import rankController from '../controllers/rankController';

router.get('/getSchoolRank', rankController.getSchoolRank);
router.get('/getUserRank', rankController.getUserRank);

export default router;