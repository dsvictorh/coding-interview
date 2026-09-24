import express from 'express';
import * as candidateController from '../controllers/candidate.controller';

const router = express.Router();

//route to search all candidates
router.get('', candidateController.listCandidates);

export default router;