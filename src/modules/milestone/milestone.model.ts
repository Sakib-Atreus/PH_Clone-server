import { Schema, model } from 'mongoose';
import { TMilestone } from './milestone.interface';

// Schema for the milestone data
const milestoneSchema = new Schema<TMilestone>(
  {
    course_id: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    courseGId: {
      type: String,
      required: [true, "Course GId is required"],
    },
    GId: {
      type: String,
      required: [true, "Milestone GId is required"],
    },
    milestoneId: {
      type: String,
      required: [true, "Milestone ID is required"],
    },
    milestoneName: {
      type: String,
      required: [true, "Milestone name is required"],
    },
    moduleList: [
      {
        type: String,
        required: [true, "Module list is required"],
      },
    ],
    assignmentId: {
      type: Schema.Types.ObjectId,
      required: false,
      unique: true,
      default:null
    },
    isCompleted: {
      type: Boolean,
      default: false, // No need for `required: false`, default handles it
    },
    isDeleted: {
      type: Boolean,
      default: false, // No need for `required: false`
    },
  },
  {
    timestamps: true, 
  }
);

// Export the milestone model
export const MilestoneModel = model<TMilestone>('Milestone', milestoneSchema);
