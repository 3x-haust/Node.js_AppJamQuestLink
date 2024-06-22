import express from 'express';

import userController from '../controllers/userController';

const router = express.Router();

router.get('/getUserById', userController.getUserById);
router.get('/getAllUsers', userController.getAllUsers);

router.post('/addQuestInProgress', userController.addQuestInProgress);
router.post('/addQuestCompleted', userController.addQuestCompleted);

router.post('/createUser', userController.createUser);
router.delete('/removeUser', userController.removeUserById);

router.put('/updateUser', userController.updateUser);

export default router;