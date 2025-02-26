import catchAsync from '../../util/catchAsync';
import userServices from './user.service';

const createUser = catchAsync(async (req, res) => {
  const user = req.body;

  const result = await userServices.createUser(user);

  res.status(200).json({
    message: 'user created successfully',
    data: result,
  });
});

const assignCourseForInstructor = catchAsync(async (req, res) => {
  const instructorId = req.query.instructorId as string;
  const courseId = req.query.courseId as string;
  if (!instructorId || !courseId) {
    throw Error('!instructorId||!courseId is missing');
  }

  const result = await userServices.assignCourseForInstructor(
    instructorId,
    courseId,
  );

  res.status(200).json({
    message: 'course assigned',
    data: result,
  });
});
// const createUser =catchAsync(async(req,res)=>{

// })

const getAllStudents = catchAsync(async (req, res) => {
  const result = await userServices.getAllStudents();
  res.status(200).json({
    message: 'Students fetched successfully',
    data: result,
  });
});

const getAllInstructors = catchAsync(async (req, res) => {
  const result = await userServices.getAllInstructors();
  res.status(200).json({
    message: 'Instructors fetched successfully',
    data: result,
  });
});

const updateStudent = catchAsync(async (req, res) => {
    const { id } = req.params;
  const updateData = req.body;

  const result = await userServices.updateStudent(id, updateData);
  res.status(200).json({
    message: 'Student updated successfully',
    data: result,
  });
});

const updateInstructor = catchAsync(async (req, res) => {
  const instructorId = req.params.instructorId;
  const updateData = req.body;

  const result = await userServices.updateInstructor(instructorId, updateData);
  res.status(200).json({
    message: 'Instructor updated successfully',
    data: result,
  });
});

const deleteStudent = catchAsync(async (req, res) => {
  const studentId = req.params.studentId;

  const result = await userServices.deleteStudent(studentId);
  res.status(200).json({
    message: 'Student deleted successfully',
    data: result,
  });
});

const deleteInstructor = catchAsync(async (req, res) => {
  const instructorId = req.params.instructorId;

  const result = await userServices.deleteInstructor(instructorId);
  res.status(200).json({
    message: 'Instructor deleted successfully',
    data: result,
  });
});

const userController = {
  createUser,
  assignCourseForInstructor,
  getAllStudents,
  getAllInstructors,
  updateStudent,
  updateInstructor,
  deleteStudent,
  deleteInstructor,
};

export default userController;
