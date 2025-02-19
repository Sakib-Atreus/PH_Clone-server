import { Types } from "mongoose";

export type TQuestionPaper = {
  id: string;
  domain: string;
  examineeId: Types.ObjectId;
  duration: number;
  totalMarks?: number;
  MCQSet: TMCQ[];
  isDeleted: Boolean;
};

export type TMCQ = {
  QPid: string;
  mcqId: string;
  question: string;
  options: string[];
  correctAns: 0 | 1 | 2 | 3;
  mark: number;
};
