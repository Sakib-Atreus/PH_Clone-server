import express from "express";
import auth from "../../middlewares/auth";
import { userRole } from "../../constents";
// import assignmentController from "./assignment.controller";

const router = express.Router();

// Route to create a new assignment
// router.post("/createAssignment", auth(userRole.instructer), assignmentController.createAssignment);

// // Route to update an existing assignment
// router.patch("/:aid", auth(userRole.instructer), assignmentController.updateAssignment);

// // Route to delete an assignment
// router.delete("/:aid", auth(userRole.instructer), assignmentController.deleteAssignment);

// // Route to get a single assignment (optional, you can add filtering or query params)
// router.get("/getSingleAssignment", assignmentController.getSingleAssignment);

// // Route to list all assignments (optional)
// router.get("/getAllAssignments", assignmentController.getAllAssignments);

const assignmentRoutes = router;

export default assignmentRoutes;
