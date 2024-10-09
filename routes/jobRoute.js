import express from 'express';
import userAuth from '../middleware/authMiddleware.js';
import { createjobController, deletejobController, getalljobController, jobstateController, updatejobController } from '../controllers/jobController.js';


const router = express.Router();

router.post('/job-create',userAuth,createjobController);
router.get('/get-job',userAuth,getalljobController);
router.put('/update-job/:id',userAuth,updatejobController);
router.delete('/delete-job/:id',userAuth,deletejobController);
router.get('/job-state',userAuth,jobstateController);

export default router;