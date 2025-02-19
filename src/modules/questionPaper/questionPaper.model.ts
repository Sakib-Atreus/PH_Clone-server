import mongoose, { model, Schema } from "mongoose";
import { TMCQ, TQuestionPaper } from "./questionPaper.interface";
import { ExamineeModel } from "../examine/examinee.model";

const TMCQSchema: Schema = new Schema({
  QPid: {
    type: mongoose.Types.ObjectId,
    ref: "QuestionPaper",
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  options: {
    type: [String],
    required: true,
  },
  correctAns: {
    type: Number,
    enum: [0, 1, 2, 3],
    required: true,
  },
  mark: {
    type: Number,
    required: true,
  },
});

const questionPaperSchema = new Schema<TQuestionPaper>(
  {
    domain: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    totalMarks: {
      type: Number,
    },
    MCQSet: {
      type: [TMCQSchema],
      required: true,
    },
    examineeId: {
      type: Schema.Types.ObjectId,
      ref: "Exam",
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: String,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

questionPaperSchema.post("save", async function () {
  await ExamineeModel.updateOne(
    { uid: this.qid },
    {
      $push: {
        questionPapers: [],
      },
    }
  );
});

export const QuestionPaperModel = model<TQuestionPaper>(
  "QuestionPaper",
  questionPaperSchema
);
