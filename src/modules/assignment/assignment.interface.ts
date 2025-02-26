import { Types } from "mongoose";

export type TAssignment = {
    GId: string;
    assignmentrId?: string;

    course_id: Types.ObjectId | string;
    milestoneId: Types.ObjectId | string;

    subject: string;
    detail:string;
    totalMarks: number;



    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
};