import { Types } from "mongoose";

export type TModule = {
    GId:string;
    moduleId?: string;
    moduleName: string;
    courseId: Types.ObjectId | string ;
    milestoneId: Types.ObjectId | string;
    videoList?: string[] | [];
    isCompleted?: boolean;
    isDeleted?: boolean;
};
  