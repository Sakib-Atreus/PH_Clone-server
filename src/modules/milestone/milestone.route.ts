import express from 'express';
import { MilestoneControllers } from './milestone.controller';

const router = express.Router();

// Route to create or post a new milestone
router.post('/create-milestone', MilestoneControllers.createMilestone);

// Route to get all milestones
router.get('/all-milestones', MilestoneControllers.getAllMilestones);

// Route to get a single milestone
router.get('/:milestoneId', MilestoneControllers.getSingleMilestone);

// Route to delete a single milestone
router.delete('/:milestoneId', MilestoneControllers.deleteMilestone);

// Route to update a single milestone
router.put('/:milestoneId', MilestoneControllers.updateMilestone);

export const MilestoneRoute = router;
