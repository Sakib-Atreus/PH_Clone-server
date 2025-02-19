import express from "express";
import {
  createQuestionPaper,
  deleteQuestionPaper,
  getAllQuestionPaper,
  getQuestionPapersOfExaminee,
  getSingleQuestionPaper,
  updateQuestionPaper,
} from "./questionPaper.controller";
import auth from "../../middlewares/auth";

const router = express.Router();

router.get("/", getAllQuestionPaper);
router.get(
  "/examinee/:examineeId",
  auth("examinee"),
  getQuestionPapersOfExaminee
);
router.get("/single/:qid", getSingleQuestionPaper);
router.post("/", auth("examinee"), createQuestionPaper);
router.patch("/:qid", auth("examinee"), updateQuestionPaper);
router.delete("/:qid", auth("examinee"), deleteQuestionPaper);

const questionPaperRoutes = router;

export default questionPaperRoutes;
