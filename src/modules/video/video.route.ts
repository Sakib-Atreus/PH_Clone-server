import express from 'express';
import { VideoControllers } from './video.controller';

const router = express.Router();

// Route to create or post a new video
router.post('/create-video', VideoControllers.createVideo);

// Route to get all video
router.get('/all-videos', VideoControllers.getAllVideos);

// Route to get a single video
router.get('/:videoId', VideoControllers.getSingleVideo);

// Route to delete a single video
router.delete('/:videoId', VideoControllers.deleteVideo);

// Route to update a single video
router.put('/:videoId', VideoControllers.updateVideo);

export const VideoRoute = router;
