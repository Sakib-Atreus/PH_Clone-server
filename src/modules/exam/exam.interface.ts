import { Types } from "mongoose";
export interface ExamType {
    questionPaperId: String,
    candidId: String
    isSubmitted: boolean,
    totalMarks: number,
    acquiredMark: number,
    startTime: Date,
    endTime: Date,
    isDeleted: boolean,
    answerSheet: {
        qId: string,
        answer: number
    }[]
}