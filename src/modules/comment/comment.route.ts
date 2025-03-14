import express from 'express';
import { commentController } from '../comment/comment.controller';
import validator from '../../util/validator';
import { commentValidationSchema } from './comment.validation';

const router = express.Router();

// Create a new comment
router.post('/create-comment', validator(commentValidationSchema), commentController.createCommentIntoDb);

// Get all comments for a specific post
router.get('/post/:postId', commentController.getCommentsByPostIdFromDb); 

// Get a specific comment by ID
router.get('/:id', commentController.getCommentByIdFromDb);

// Update a comment
router.put('/:id', commentController.updateCommentFromDb);

// Delete a comment
router.delete('/:id', commentController.deleteCommentFromDb);

export const commentRoute = router;
