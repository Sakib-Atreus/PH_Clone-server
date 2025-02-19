import catchAsync from "../../util/catchAsync";
import { 
    endExam,
    startExam
 } from "./exam.service";

export const startExamController = catchAsync(async (req, res) => {
    req.body.startTime = parseInt(req.body.startTime, 10)
    const result = await startExam(req.body)
    res.send({
        message: "Exam created successfully",
        success: true,
        status: 200,
        body: result,
    })
})


export const endExamController = catchAsync(async (req, res) => {
    const {id, ...rest} = req.body
    const result = await endExam(id, rest)
    
    res.send({
        message: "Exam updated successfully",
        success: true,
        status: 200,
        body: result,
    })
})
