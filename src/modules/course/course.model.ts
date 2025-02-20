import mongoose, { Schema } from 'mongoose';
import { TCourse } from './course.interface';

const courseSchema = new Schema(
  {
    GId: { type: String, required: true },
    courseId: { type: String, required: true, unique: true },
    courseName: { type: String, required: true, unique: true },
    milestoneList: { type: [Schema.Types.ObjectId] },
    isCompleted: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true, versionKey: false },
);

const Course = mongoose.model<TCourse>('Course', courseSchema);

export default Course;