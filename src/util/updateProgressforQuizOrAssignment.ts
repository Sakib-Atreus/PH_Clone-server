import { Types } from "mongoose";
import { StudentModel } from "../modules/user/user.model";
import { accessCollection, accessRequest } from "../constents";

const updateProgressforQuizOrAssignment = async (
    userId: Types.ObjectId,
    incomingGId: string,
    accessReqFor: accessCollection
) => {
    try {
        // Find the student by userId
        const student = await StudentModel.findOne({ user: userId });

        if (!student) {
            throw new Error("Student not found.");
        }

        // Extract the numeric part from incomingGId
        const extractedNumber = parseInt(incomingGId.replace(/^\D+/g, ""), 10);

        if (isNaN(extractedNumber)) {
            throw new Error("Invalid incomingGId format.");
        }

        // Define the update object dynamically
        let incrementFields: any = {};

        if (accessReqFor === accessRequest.quiz) {
            // Increment lastQuizNo by 1
            incrementFields["progress.$[].lastQuizNo"] = 1;
            // Increment moduleNo by 1
            incrementFields["progress.$[].moduleNo"] = 1;
        } else if (accessReqFor === accessRequest.assignment) {
            // Increment lastAssignmentNo by 1
            incrementFields["progress.$[].lastAssignmentNo"] = 1;
            // Increment milestoneNo by 1
            incrementFields["progress.$[].milestoneNo"] = 1;
        } else {
            throw new Error("Invalid accessReqFor type.");
        }

        // Update student progress
        const updatedStudent = await StudentModel.findOneAndUpdate(
            { user: userId },
            { $inc: incrementFields }, // Increment the necessary fields
            { new: true }
        );

        if (!updatedStudent) {
            throw new Error("Failed to update student progress.");
        }

        return updatedStudent;
    } catch (error) {
        console.error("Error updating progress:", error);
        throw error;
    }
};

export default updateProgressforQuizOrAssignment;


