import { Types } from "mongoose";
import { StudentModel } from "../modules/user/user.model";
import idConverter from "./idConvirter";

const setProgress = async ( 
    courseId: string | Types.ObjectId, 
    userId: string | Types.ObjectId, 
    session?: any // Optional session parameter
) => {
    let convertedCourseId: Types.ObjectId | null = typeof courseId === "string" ? idConverter(courseId) : courseId;
    let convertedUserId: Types.ObjectId | null = typeof userId === "string" ? idConverter(userId) : userId;

    if (!convertedCourseId) throw new Error("Invalid courseId provided.");
    if (!convertedUserId) throw new Error("Invalid userId provided.");

    console.log("Converted Course ID:", convertedCourseId);
    console.log("Converted User ID:", convertedUserId);

    // Handle session: If session is not provided, use the default behavior without it
    const queryOptions = session ? { session } : {}; // Add session if provided

    // Find student with or without session
    const student = await StudentModel.findOne({ user: convertedUserId }).setOptions(queryOptions);

    if (!student) {
        throw new Error("Student not found.");
    }

    const existingProgress = student.progress.find((p: any) => p.courseId.equals(convertedCourseId));

    if (existingProgress) {
        throw new Error("Progress for this course already exists.");
    }

    const progress = {
        courseId: convertedCourseId,
        milestoneNo: 0,
        moduleNo: 0,
        vedioNo: 0,
        lastQuizNo: 0,
        lastAssignmentNo: 0,
    };

    // Use session if provided
    const setStudentProgress = await StudentModel.findOneAndUpdate(
        { user: convertedUserId },
        { $push: { progress: progress } },
        { new: true, ...queryOptions } // Pass session here if available
    );

    if (!setStudentProgress) {
        throw new Error("Progress not set");
    }

    return setStudentProgress;
};

export default setProgress;