// import { NextFunction, Request, Response } from "express";
// import { StudentModel } from "../modules/user/user.model";
// import { VideoModel } from "../modules/video/video.model";
// import idConverter from "../util/idConvirter";
// import { accessRequest } from "../constents";
// import { QuestionPaperModel } from "../modules/questionPaper/questionPaper.model";
// import { MilestoneModel } from "../modules/milestone/milestone.model";
// import { ModuleModel } from "../modules/module/module.model";
// import { Types } from "mongoose";



// const calculator = (alreadyProgressed: number, incomingProgress: string): number => {

//     const extractedNumber = parseInt(incomingProgress.replace(/^\D+/g, ''), 10);
//     if (isNaN(extractedNumber)) {
//         throw new Error("Invalid GId format.");
//     }
//     return extractedNumber - alreadyProgressed;
// };




// const modifyProgress = async (alreadyProgress: any, incomingProgressDetail: any, user: Types.ObjectId, accessCollection: "video" | "quiz" | "assignment") => {

//     if (accessCollection === accessRequest.video) {

//         const incomingMilestone = await MilestoneModel.findOne({ _id: incomingProgressDetail.milestoneId }).select("GId -_id");
//         const incomingModule = await ModuleModel.findOne({ _id: incomingProgressDetail.moduleId }).select("GId -_id");

//         if (!incomingMilestone || !incomingModule) {
//             throw new Error("milestone or module is not found");
//         }

//         // milestone check 
//         const milestoneCheck = calculator(alreadyProgress.milestoneNo, incomingProgressDetail.GId);
//         const moduleCheck = calculator(alreadyProgress.moduleNo, incomingModule.GId);
//         const videoCheck = calculator(alreadyProgress.vedioNo, incomingProgressDetail.GId);
//         console.log(milestoneCheck, moduleCheck);

//         if (milestoneCheck <= 1 && moduleCheck <= 1 && videoCheck <= 1) {
//             console.log("You are good to go");
           
//             const constTractProhress = {
//                 courseId: alreadyProgress.courseId,
//                 milestoneNo: alreadyProgress.milestoneNo,
//                 moduleNo: alreadyProgress.moduleNo,
//                 vedioNo: alreadyProgress.vedioNo + (videoCheck > 0 ? videoCheck : 0),
//                 lastQuizNo: alreadyProgress.lastQuizNo ,
//                 lastAssignmentNo: alreadyProgress.lastAssignmentNo
//             };

//             console.log(constTractProhress)


//             await StudentModel.findOneAndUpdate(
//                 { user : user },
//                 { "progress.courseId": alreadyProgress.courseId },
//                 { $set: { "progress.$": constTractProhress } }
//             );


//         }
//         else {
//             throw new Error("please compleare the previous milestone and module or video");
//         }
//     }



//     else if (accessCollection === accessRequest.quiz) {
//         const incomingMilestone = await MilestoneModel.findOne({ _id: incomingProgressDetail.milestoneId }).select("GId -_id");
//         const incomingModule = await ModuleModel.findOne({ _id: incomingProgressDetail.moduleId }).select("GId -_id");

//         if (!incomingMilestone || !incomingModule) {
//             throw new Error("milestone or module is not found");
//         }

//         // milestone check 
//         const milestoneCheck = calculator(alreadyProgress.milestoneNo, incomingProgressDetail.GId);
//         const moduleCheck = calculator(alreadyProgress.moduleNo, incomingModule.GId);
//         const quizCheck = calculator(alreadyProgress.lastQuizNo, incomingProgressDetail.GId);
//         console.log(milestoneCheck, moduleCheck);

//         if (milestoneCheck <= 1 && moduleCheck <= 1 && quizCheck <= 1) 
//         {
//             console.log("You are good to go");
//         }  
//         else {
//             throw new Error("please compleare the previous milestone and module or video");
//         }
//     }


//     else if (accessCollection === accessRequest.assignment) {
//         const incomingMilestone = await MilestoneModel.findOne({ _id: incomingProgressDetail.milestoneId }).select("GId -_id");
//         const incomingModule = await ModuleModel.findOne({ _id: incomingProgressDetail.moduleId }).select("GId -_id");

//         if (!incomingMilestone || !incomingModule) {
//             throw new Error("milestone or module is not found");
//         }

//         // milestone check 
//         const milestoneCheck = calculator(alreadyProgress.milestoneNo, incomingProgressDetail.GId);
//         const moduleCheck = calculator(alreadyProgress.moduleNo, incomingModule.GId);
//         const assignmentCheck = calculator(alreadyProgress.lastAssignmentNo, incomingProgressDetail.GId);
//         console.log(milestoneCheck, moduleCheck);

//         if (milestoneCheck <= 1 && moduleCheck <= 1 && assignmentCheck <= 1) 
//         {
//             console.log("You are good to go");
//         }  
//         else {
//             throw new Error("please compleare the previous milestone and module or video");
//         }
//     }
// };





// const accessAuth = (accessCollection: "video" | "quiz" | "assignment") => {
//     return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//         try {
//             const userId = req.user.id;
//             let incomingProgressDetail


//             if (accessCollection === accessRequest.video) {
//                 const videoId = req.params.videoId;
//                 incomingProgressDetail = await VideoModel.findOne({ _id: idConverter(videoId) });
//                 if (!incomingProgressDetail) {
//                     throw new Error("Resource not found: Video does not exist.");
//                 }
//             }


//             else if (accessCollection === accessRequest.quiz) {
//                 const quizId = req.body.questionPaperId as string
//                 incomingProgressDetail = await QuestionPaperModel.findOne({ _id: idConverter(quizId) });
//                 if (!incomingProgressDetail) {
//                     throw new Error("Resource not found: Quiz does not exist.");
//                 }
//             }


//             else if (accessCollection === accessRequest.assignment) {
//                 console.log("Assignment");
//             }




//             if (!incomingProgressDetail) {
//                 throw new Error("Resource not found: Incoming progress detail is missing.");
//             }

//             console.log("incomming progress detail",incomingProgressDetail.course_id)

//             const alreadyProgressed = await StudentModel.aggregate([
//                 { $match: { user: idConverter(userId) } },
//                 { $unwind: "$progress" },
//                 { $match: { "progress.courseId": incomingProgressDetail.course_id } },
//                 { $project: { _id: 0, progress: 1 } },
//             ]);

//             console.log("already progressed", alreadyProgressed)

//             if (!alreadyProgressed || alreadyProgressed.length === 0) {
//                 throw new Error("Access denied: You do not have permission to access this resource.");
//             }


//             console.log(alreadyProgressed[0].progress, incomingProgressDetail, accessCollection)

//             const user = idConverter(userId);
//             if (!user) {
//                 throw new Error("User not found.");
//             }


//             await modifyProgress(alreadyProgressed[0].progress, incomingProgressDetail, user, accessCollection);


//             next(); // Proceed to next middleware/controller
//         } catch (error) {
//             next(error); // Pass error to the global error handler
//         }
//     };
// };

// export default accessAuth;

// Modify student progress based on access type


import { NextFunction, Request, Response } from "express";
import { StudentModel } from "../modules/user/user.model";
import { VideoModel } from "../modules/video/video.model";
import idConverter from "../util/idConvirter";
import { accessRequest } from "../constents";
import { QuestionPaperModel } from "../modules/questionPaper/questionPaper.model";
import { MilestoneModel } from "../modules/milestone/milestone.model";
import { ModuleModel } from "../modules/module/module.model";
import { Types } from "mongoose";


const calculateProgressDifference = (current: number, incomingGId: string): number => {
    const extractedNumber = parseInt(incomingGId.replace(/^\D+/g, ''), 10);
    if (isNaN(extractedNumber)) {
        throw new Error("Invalid GId format.");
    }
    return extractedNumber - current;
};


const modifyProgress = async (
    alreadyProgress: any,
    incomingProgressDetail: any,
    userId: Types.ObjectId,
    accessCollection: "video" | "quiz" | "assignment"
) => {
    const incomingMilestone = await MilestoneModel.findById(incomingProgressDetail.milestoneId).select("GId");
    const incomingModule = await ModuleModel.findById(incomingProgressDetail.moduleId).select("GId");

    if (!incomingMilestone || !incomingModule) {
        throw new Error("Milestone or module not found.");
    }

    const milestoneCheck = calculateProgressDifference(alreadyProgress.milestoneNo, incomingMilestone.GId);
    const moduleCheck = calculateProgressDifference(alreadyProgress.moduleNo, incomingModule.GId);

    let updateFields: any = {};

    if (accessCollection === accessRequest.video) {
        const videoCheck = calculateProgressDifference(alreadyProgress.vedioNo, incomingProgressDetail.GId);
    
        if (milestoneCheck <= 0 && moduleCheck <= 0 && videoCheck <= 0) {
            if (videoCheck === 0) {
                updateFields = { "progress.$.vedioNo": alreadyProgress.vedioNo + 1 };
            }
            console.log("You can watch this video.");
        } else {
            throw new Error("Complete the previous milestone, module, or video first.");
        }
    } 
    else if (accessCollection === accessRequest.quiz) {
        const quizCheck = calculateProgressDifference(alreadyProgress.lastQuizNo, incomingProgressDetail.GId);

        if (milestoneCheck === 0 && moduleCheck === 0 && quizCheck === 0) {
            console.log("You are good to go");
        } else {
            throw new Error("Complete the previous milestone, module, or quiz first.");
        }
    } 
    else if (accessCollection === accessRequest.assignment) {
        const assignmentCheck = calculateProgressDifference(alreadyProgress.lastAssignmentNo, incomingProgressDetail.GId);

        if (milestoneCheck === 0 && moduleCheck === 0 && assignmentCheck === 0) {
            console.log("You are good to go");
        } else {
            throw new Error("Complete the previous milestone, module, or assignment first.");
        }
    }

    // Update the student's progress
    const updatedStudent = await StudentModel.findOneAndUpdate(
        { user: userId, "progress.courseId": alreadyProgress.courseId },
        { $set: updateFields },
        { new: true }
    );

    if (!updatedStudent) {
        throw new Error("Failed to update student progress.");
    }
};

// Middleware for checking access
const accessAuth = (accessCollection: "video" | "quiz" | "assignment") => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = idConverter(req.user.id);
            if (!userId) {
                throw Error("User ID is not found");
            }

            let incomingProgressDetail;

            if (accessCollection === accessRequest.video) {
                incomingProgressDetail = await VideoModel.findById(idConverter(req.params.videoId));
            } else if (accessCollection === accessRequest.quiz) {
                incomingProgressDetail = await QuestionPaperModel.findById(idConverter(req.body.questionPaperId));
            } else if (accessCollection === accessRequest.assignment) {
                console.log("Assignment handling is required.");
            }

            if (!incomingProgressDetail) {
                throw new Error("Resource not found.");
            }

            const alreadyProgressed = await StudentModel.aggregate([
                { $match: { user: userId } },
                { $unwind: "$progress" },
                { $match: { "progress.courseId": incomingProgressDetail.course_id } },
                { $project: { _id: 0, progress: 1 } }
            ]);

            if (!alreadyProgressed || alreadyProgressed.length === 0) {
                throw new Error("Access denied: No progress found.");
            }

            await modifyProgress(alreadyProgressed[0].progress, incomingProgressDetail, userId, accessCollection);

            next(); // Proceed to next middleware/controller
        } catch (error) {
            next(error); // Pass error to global error handler
        }
    };
};

export default accessAuth;


