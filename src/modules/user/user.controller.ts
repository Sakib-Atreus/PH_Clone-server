import catchAsync from '../../util/catchAsync';
import userServices from './user.service';

const createUser =catchAsync(async(req,res)=>{
    const user= req.body

    const result = await userServices.createUser(user)

  res.status(200).json({
    message: 'user created successfully',
    data: result,
  });
});

const assignCourseForInstructor =catchAsync(async(req,res)=>{

    const instructorId = req.query.instructorId as string
    const courseId = req.query.courseId as string
    if(!instructorId||!courseId)
    {
        throw Error ("!instructorId||!courseId is missing")
    }

    const result = await userServices.assignCourseForInstructor(instructorId,courseId)

    res.status(200).json({
        message:"course assigned",
        data:result
    })
})
// const createUser =catchAsync(async(req,res)=>{

// })

const userController={
    createUser,
    assignCourseForInstructor
}

export default userController;
