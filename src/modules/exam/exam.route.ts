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
import { userRole } from "../../constents";


const router = express.Router();

router.post("/start", auth(userRole.candidate), validator(StartExamSchema), startExamController)
router.post("/end", auth(userRole.candidate), validator(EndExamSchema), endExamController)


const examRoute = router

export default examRoute
