import { model, Schema } from "mongoose";
import { ExamType } from "./exam.interface";


const answerSheetSchema = new Schema({
    qId: { type: String, required: true },
    answer: { type: Number, required: true }
});

answerSheetSchema.pre("save", async function (next) {
    const index = this.answer
    if (index === 0 || index === 2 || index === 3 || index === 4) return next()
    throw new Error("Invalid Answer")
})

const examSchema = new Schema<ExamType>({
    isSubmitted: {
        type: Boolean,
        required: true,
        default: false
    },
    answerSheet: {
        type: [answerSheetSchema],
        required: true
    },
    startTime: {
        type: Date,
    },
    endTime: {
        type: Date,
    },
    totalMarks: {
        type: Number
    },
    isDeleted:{
        type:Boolean,
        required: true,
        default: false
    },
    questionPaperId: {
        type: String,
        required: true,
        unique: true
    },
    candidId:{
        type: String,
        required: true,
        unique: true
    }
}, {
    timestamps: true
})


export const examModel = model<ExamType>('Exam', examSchema)