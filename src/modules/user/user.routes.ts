import express from "express"
import userController from "./user.controller"
import { userRole } from "../../constents"
import auth from "../../middlewares/auth"
const userRoutes = express.Router()


userRoutes.post("/createStudent", (req, res,next) => {
    req.body = {
        ...req.body, role: userRole.student
    }
    next()
}, userController.createUser)

userRoutes.post("/createInstructer", (req, res,next) => {
    req.body = {
        ...req.body, role: userRole.student
    }
    next()
}, auth(userRole.admin), userController.createUser)

userRoutes.post("/assignCourse",auth(userRole.admin),userController.assignCourseForInstructor)


export default userRoutes