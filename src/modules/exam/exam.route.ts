import express from "express";
import validator from "../../util/validator";
import {
    startExam as StartExamSchema,
    endExam as EndExamSchema
} from "./exam.validation";
import {
    startExamController,
    endExamController
} from "./exam.controller";
import auth from "../../middlewares/auth";
import { accessRequest, userRole } from "../../constents";
import accessAuth from "../../middlewares/accessAuth";


const router = express.Router();

router.post("/start", auth(userRole.student), validator(StartExamSchema),accessAuth(accessRequest.quiz), startExamController)
router.post("/submit", auth(userRole.student), endExamController)


const examRoute = router

export default examRoute