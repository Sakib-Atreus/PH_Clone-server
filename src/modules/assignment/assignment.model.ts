import { Schema, model, Document } from "mongoose";
import { Types } from "mongoose";
import { TAssignment } from "./assignment.interface";

// Define the Assignment schema
const assignmentSchema = new Schema<TAssignment>(
    {
        GId: {
            type: String,
            required: true,
            unique: true, // Assuming GId should be unique
        },
        assignmentrId: {
            type: String,
            required: false, // Optional field
        },
        course_id: {
            type: Schema.Types.ObjectId,
            ref: "Course", // Assuming you have a Course model, replace with the correct model name
            required: true,
        },
        milestoneId: {
            type: Schema.Types.ObjectId,
            ref: "Milestone", // Assuming you have a Milestone model, replace with the correct model name
            required: true,
        },
        subject: {
            type: String,
            required: true,
        },
        detail:{
            type: String,
            required: true,
        },
        totalMarks: {
            type: Number,
            required: true,
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true, // This will automatically create createdAt and updatedAt fields
    }
);


const AssignmentModel = model<TAssignment>("Assignment", assignmentSchema);

export default AssignmentModel