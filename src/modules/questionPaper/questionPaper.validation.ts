import { z } from "zod";
import { Types } from "mongoose";

const TMCQSchema = z.object({
  qid: z.string(),
  mcqId: z.string(),
  question: z.string(),
  options: z.array(z.string()).nonempty(),
  correctAns: z.enum([0, 1, 2, 3]),
  mark: z.number().min(1, "Mark must be greater than 0"),
});

export const TQuestionPaperSchema = z.object({
  qid: z.string(),
  domain: z.string(),
  examineeId: z.custom<Types.ObjectId>((val) => Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId format",
  }),
  duration: z.number().min(1, "Duration must be a positive number"),
  totalMarks: z.number().optional().min(0, "Total marks cannot be negative"),
  MCQSet: z.array(TMCQSchema).nonempty("The MCQ set cannot be empty"),
  isDeleted: z.boolean(),
});
