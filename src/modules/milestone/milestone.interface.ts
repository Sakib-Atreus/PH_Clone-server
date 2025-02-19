import { Types } from "mongoose";

export type TMilestone = {
    milestoneId: string;
    milestoneName: string;
    courseId: Types.ObjectId;
    moduleList: string[];
    isCompleted?: boolean;
    isDeleted?: boolean;
};
  