import { Types } from "mongoose";

export type TMilestone = {
    course_id:Types.ObjectId | string;
    courseGId:string,
    GId:string;
    milestoneId: string;
    milestoneName: string;
    moduleList: string[];
    isCompleted?: boolean;
    isDeleted?: boolean;
};