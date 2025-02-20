import express from 'express';
import authRouter from '../modules/auth/auth.routes';
import candidateRouter from '../modules/candidate/candidate.routes';
import examineRoutes from '../modules/examine/examine.routes';
import questionPaperRoutes from '../modules/questionPaper/questionpaper.route';
import examRoute from '../modules/exam/exam.route';
import userRoutes from '../modules/user/user.routes';
import { MilestoneRoute } from '../modules/milestone/milestone.route';
import { courseRoute } from '../modules/course/course.route';
import { ModuleRoute } from '../modules/module/module.route';
import { VideoRoute } from '../modules/video/video.route';
import { postRoute } from '../modules/post/post.route';
import { commentRoute } from '../modules/comment/comment.route';
import { replyRoute } from '../modules/reply/reply.route';

const Routes = express.Router();
// Array of module routes
const moduleRouts = [
  {
    path: '/auth',
    router: authRouter,
  },
  {
    path: '/user',
    router: userRoutes,
  },
  {
    path: '/examine',
    router: examineRoutes,
  },
  {
    path: '/candidate',
    router: candidateRouter,
  },
  {
    path: '/questionPaper',
    router: questionPaperRoutes,
  },
  {
    path: '/exam',
    router: examRoute,
  },
  {
    path: '/milestone',
    router: MilestoneRoute,
  },
  {
    path: '/course',
    router: courseRoute,
  },
  {
    path: '/module',
    router: ModuleRoute,
  },
  {
    path: '/video',
    router: VideoRoute,
  },
  {
    path: '/post',
    router: postRoute,
  },
  {
    path: '/comment',
    router: commentRoute,
  },
  {
    path: '/reply',
    router: replyRoute,
  },
];

// Register each route in moduleRouts
moduleRouts.forEach(({ path, router }) => {
  // console.log("path:",path,router)
  Routes.use(path, router);
});

// Export the router
export default Routes;