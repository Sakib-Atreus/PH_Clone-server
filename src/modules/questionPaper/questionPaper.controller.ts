import catchAsync from "../../util/catchAsync";
import {
  createQuestionPaperIntoDB,
  deleteQuestionPaperIntoDB,
  getAllQuestionPaperByExamineeId,
  getAllQuestionPaperFromDB,
  getSingleQuestionPaperFromDB,
  updateQuestionPaperIntoDB,
} from "./questionPaper.service";

export const getAllQuestionPaper = catchAsync(async (req, res) => {
  const result = await getAllQuestionPaperFromDB();
  res.status(200).json({
    message: "All question papers retrieved successfully",
    success: true,
    status: 200,
    body: result,
  });
});

export const getSingleQuestionPaper = catchAsync(async (req, res) => {
  const result = await getSingleQuestionPaperFromDB(req.params.qid);
  res.status(200).json({
    message: "Single question paper retrieved successfully",
    success: true,
    status: 200,
    body: result,
  });
});

export const getQuestionPapersOfExaminee = catchAsync(async (req, res) => {
  const result = await getAllQuestionPaperByExamineeId(req.params.examineeId);
  res.status(200).json({
    message: "Single question paper retrieved successfully",
    success: true,
    status: 200,
    body: result,
  });
});

export const createQuestionPaper = catchAsync(async (req, res) => {
  const result = await createQuestionPaperIntoDB(req.body);
  res.status(200).json({
    message: "Question paper created successfully",
    success: true,
    status: 200,
    body: result,
  });
});

export const updateQuestionPaper = catchAsync(async (req, res) => {
  const result = await updateQuestionPaperIntoDB(req.params.qid, req.body);
  res.status(200).json({
    message: "Question paper updated successfully",
    success: true,
    status: 200,
    body: result,
  });
});

export const deleteQuestionPaper = catchAsync(async (req, res) => {
  const result = await deleteQuestionPaperIntoDB(req.params.qid);
  res.status(200).json({
    message: "Question paper deleted successfully",
    success: true,
    status: 200,
    body: result,
  });
});
