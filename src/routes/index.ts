import express from "express";
import authRouter from "../modules/auth/auth.routes";
import candidateRouter from "../modules/candidate/candidate.routes";
// import examineRoutes from "../modules/examine/examine.routes";
import questionPaperRoutes from "../modules/questionPaper/questionpaper.route";
import examRoute from "../modules/exam/exam.route";
import userRoutes from "../modules/user/user.routes";
import enrollRoutes from "../modules/enrollment/enrollment.routes";
import { MilestoneRoute } from "../modules/milestone/milestone.route";
import { courseRoute } from "../modules/course/course.route";
import { ModuleRoute } from "../modules/module/module.route";
import { VideoRoute } from "../modules/video/video.route";
import { postRoute } from "../modules/post/post.route";
import { commentRoute } from "../modules/comment/comment.route";
import { replyRoute } from "../modules/reply/reply.route";
import assignmentRoutes from "../modules/assignment/assignment.routes";

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
  // {
  //   path: '/examine',
  //   router: examineRoutes,
  // },
  // {
  //   path: '/candidate',
  //   router: candidateRouter,
  // },
  {
    path: '/questionPaper',
    router: questionPaperRoutes,
  },
  {
    path: "/exam",
    router: examRoute
  },
  {
    path: "/user",
    router: enrollRoutes
  },
  {
    path: "/milestone",
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
  {
    path: '/assignment',
    router: assignmentRoutes,
  },
  
];

// Register each route in moduleRouts
moduleRouts.forEach(({ path, router }) => {
  // console.log("path:",path,router)
  Routes.use(path, router);
});

// Export the router
export default Routes;



// NODE_ENV="devlopment"
// PORT=5000


// MONGOOSE_URI=mongodb+srv://phclone:testph@cluster0.v8jfl.mongodb.net/phServerData?retryWrites=true&w=majority

// JWT_TOKEN_SECRET=90b993b816f5a33db98331dffee22e4e2027e2de61376f1a87ac6d8ad94e8073
// JWT_REFRESHTOKEN_SECRET=76d80fbc8970466929db4d3bc75981eeb497c37daf32464175796e120b2298d6

// TOKEN_EXPAIRS_IN=4d
// REFRESH_TOKEN_EXPAIRS_IN=365d