import express from 'express'
import userAuth from '../middleware/authMiddleware.js';
import { updateController } from '../controllers/userController';



const router = express.Router();

router.put('/update-user',userAuth,updateController)

export default router