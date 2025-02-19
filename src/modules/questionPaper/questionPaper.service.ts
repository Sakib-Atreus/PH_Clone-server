import { TQuestionPaper } from "./questionPaper.interface";
import { QuestionPaperModel } from "./questionPaper.model";

// candidate
export const getAllQuestionPaperFromDB = async () => {
  const result = await QuestionPaperModel.find({ isDeleted: false });
  return result;
};

// examinee
export const getAllQuestionPaperByExamineeId = async (examineeId: string) => {
  console.log(examineeId);
  const result = await QuestionPaperModel.find({
    examineeId,
    isDeleted: false,
  });
  return result;
};

// candidate
export const getSingleQuestionPaperFromDB = async (qid: string) => {
  const result = await QuestionPaperModel.findOne({ qid, isDeleted: false });
  return result;
};

// examinee
export const createQuestionPaperIntoDB = async (payload: TQuestionPaper) => {
  const result = await QuestionPaperModel.create(payload);
  return result;
};

// examinee
export const updateQuestionPaperIntoDB = async (
  qid: string,
  payload: object
) => {
  console.log(qid);
  const result = await QuestionPaperModel.updateOne(
    { qid, isDeleted: false },
    payload
  );
  return result;
};

// examinee
export const deleteQuestionPaperIntoDB = async (qid: string) => {
  const result = await QuestionPaperModel.updateOne(
    { qid, isDeleted: false },
    { isDeleted: true }
  );
  return result;
};
