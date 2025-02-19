import { TMilestone } from "../milestone/milestone.interface";

export type TCourse = {
  courseId: string;
  courseName: string;
  milestoneList: TMilestone[];
  isCompleted: boolean;
  isDeleted: boolean;
};
