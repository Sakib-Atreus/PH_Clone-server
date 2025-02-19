import mongoose from "mongoose";
import { TUser, TUserRole } from "./user.interface"
import { InstructorModel, StudentModel, UserModel } from "./user.model"
import { userRole } from "../../constents";
import idConverter from "../../util/idConvirter";

const createUser = async (payload: TUser) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const user = new UserModel({ ...payload });
        await user.save({ session });

        if (payload.role === userRole.student) {
            const student = new StudentModel({
                user: user._id,
                paymentStatus: false,
                progress: [],
                courseAccess: [],
            });
            await student.save({ session });
        } 
        else if (payload.role === userRole.instructer) {
            const instructor = new InstructorModel({
                user: user._id,
                courseAccess: [],
            });
            await instructor.save({ session });
        }

        await session.commitTransaction();
        session.endSession();

        return user;
    } catch (error: any) {
        await session.abortTransaction();
        session.endSession();

        console.error("Error creating user:", error);
        throw new Error(`User creation failed: ${error.message}`);
    }
};


const assignCourseForInstructor = async (instructorId: string, courseId: string) => {
    const convertedInstructorId = idConverter(instructorId);
    const convertedCourseId = idConverter(courseId);

    
    const result = await InstructorModel.findOneAndUpdate(
        { user: convertedInstructorId },
        { $push: { courseAccess: convertedCourseId } },
        { new: true } 
    );

    return result;
}


const userServices = {
    createUser, assignCourseForInstructor
}

export default userServices