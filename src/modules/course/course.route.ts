import express from 'express';
import { courseController } from './course.controller';

const router = express.Router();

router.post('/create-course', courseController.createCourseIntoDb);

router.get('/all-courses', courseController.getAllCoursesFromDb);

router.get('/single-course/:id', courseController.getCourseByIdFromDb);

router.put('/update-course/:id', courseController.updateCourseFromDb);

router.put('/delete-course/:id', courseController.deleteCourseFromDb);

export const courseRoute = router;
