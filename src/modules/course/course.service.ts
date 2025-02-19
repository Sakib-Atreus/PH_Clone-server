import { TCourse } from './course.interface';
import Course from './course.model';

const createCourseIntoDb = async (courseData: TCourse) => {
  const result = await Course.create(courseData);
  return result;
};

// console.log(courseData)
//   const convertedDocument = documentConverter(Course);
//   const genaretedCourseId = await idGenerator.collectionIdGenerator(Course,idFor.course) 

// Get all courses with optional filtering
const getAllCoursesFromDb = async (query: Record<string, unknown>) => {
  const courseQuery = Course.find(query);
  const result = await courseQuery.exec();
  return result;
};

const getCourseByIdFromDb = async (_id: string) => {
  const result = await Course.findById(_id).exec();
  return result;
};

const updateCourseFromDb = async (
  _id: string,
  updateData: Partial<TCourse>,
) => {
  const result = await Course.findByIdAndUpdate(_id, updateData, {
    new: true,
    runValidators: true,
  }).exec();
  return result;
};

const deleteCourseFromDb = async (_id: string) => {
  const result = await Course.findByIdAndUpdate(
    { _id },
    { isDeleted: true },
    { new: true, runValidators: true },
  );
  return result;
};

export const courseService = {
  createCourseIntoDb,
  getAllCoursesFromDb,
  getCourseByIdFromDb,
  updateCourseFromDb,
  deleteCourseFromDb,
};
