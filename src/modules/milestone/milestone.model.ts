import { Schema, model } from 'mongoose';
import { TMilestone } from './milestone.interface';

// Schema for the milestone data
const milestoneSchema = new Schema<TMilestone>({
  milestoneId: {
    type: String,
    required: [true, 'Milestone ID is required'],
    unique: true,
  },
  milestoneName: {
    type: String,
    required: [true, 'Milestone name is required'],
  },
  courseId: {
    type: Schema.Types.ObjectId,
    required: [true, 'Course ID is required'],
  },
  moduleList: [
    {
      type: String,
      required: [true, 'Module list is required'],
    },
  ],
  isCompleted: {
    type: Boolean,
    required: [false, 'Completion status is required'],
    default: false,
  },
  isDeleted: {
    type: Boolean,
    required: [false, 'Deleted status is required'],
    default: false,
  },
});

// Export the milestone model
export const MilestoneModel = model<TMilestone>('Milestone', milestoneSchema);
