import mongoose, { Schema } from 'mongoose';
import { TCourse } from './course.interface';

const courseSchema = new Schema(
  {
    courseId: { type: String, required: true },
    courseName: { type: String, required: true },
    milestoneList: { type: [String] },
    isCompleted: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true, versionKey: false },
);

const Course = mongoose.model<TCourse>('Course', courseSchema);

export default Course;
