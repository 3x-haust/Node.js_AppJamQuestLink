import express from 'express';

import questController from '../controllers/questController';

const router = express.Router();

router.post('/getGeneratedQuest', questController.getGeneratedQuest);
router.get('/getQuestById', questController.getQuestById);
router.post('/createQuest', questController.createQuest);
router.delete('/removeQuest', questController.removeQuestById);

export default router;