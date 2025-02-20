import { Request, Response } from 'express';
import { MilestoneServices } from './milestone.service';
import {
  milestoneValidationSchema,
  partialMilestoneValidationSchema,
} from './milestone.validation';
import catchAsync from '../../util/catchAsync';
import sendResponse from '../../util/sendResponse';
import { HttpStatus } from 'http-status-ts';
import Course from '../course/course.model';
import mongoose from 'mongoose';

// Controller to create a milestone
const createMilestone = catchAsync(async (req: Request, res: Response) => {
  const milestoneData = req.body;
  // Validate the input data using your validation schema
  // const parsedMilestoneData = milestoneValidationSchema.parse(milestoneData);

  // Ensure the courseId is an ObjectId (if it’s a string, we convert it)
  // const courseId = new mongoose.Types.ObjectId(parsedMilestoneData.courseId);

  // Step 1: Create the milestone
  const result = await MilestoneServices.createMilestoneIntoDB(milestoneData);

  // Step 2: Add the milestone ID to the course's milestoneList[]
  // const course = await Course.findByIdAndUpdate(
  //   parsedMilestoneData.courseId,
  //   { $push: { milestoneList: result._id } }, // Add the milestone's ObjectId to the list
  //   { new: true, runValidators: true },
  // );

  sendResponse(res, {
    success: true,
    statusCode: HttpStatus.CREATED,
    message: 'Milestone created successfully!',
    data: result,
  });
});

// Controller to get all milestones (with optional search term)
const getAllMilestones = catchAsync(async (req: Request, res: Response) => {
  const searchTerm = req.query.searchTerm;
  const query: any = {};

  if (searchTerm) {
    query.$or = [
      { milestoneName: { $regex: searchTerm, $options: 'i' } },
      { courseId: { $regex: searchTerm, $options: 'i' } },
      { moduleList: { $regex: searchTerm, $options: 'i' } },
    ];
  }

  const result = await MilestoneServices.getAllMilestonesFromDB(query);

  if (!result || result.length === 0) {
    return sendResponse(res, {
      success: false,
      statusCode: HttpStatus.NOT_FOUND,
      message: 'Milestones not found!',
      data: null,
    });
  }

  sendResponse(res, {
    success: true,
    statusCode: HttpStatus.OK,
    message: 'Milestones fetched successfully!',
    data: result,
  });
});

// Controller to get a single milestone
const getSingleMilestone = catchAsync(async (req: Request, res: Response) => {
  const { milestoneId } = req.params;

  // Call service to get the milestone by its ID
  const result = await MilestoneServices.getSingleMilestoneFromDB(milestoneId);

  if (!result) {
    // If milestone not found, send a 404 response
    return sendResponse(res, {
      success: false,
      statusCode: HttpStatus.NOT_FOUND,
      message: 'Milestone not found!',
      data: null,
    });
  }

  // If milestone found, send a success response
  sendResponse(res, {
    success: true,
    statusCode: HttpStatus.OK,
    message: 'Milestone fetched successfully!',
    data: result,
  });
});

// Controller to delete a single milestone
const deleteMilestone = catchAsync(async (req: Request, res: Response) => {
  const { milestoneId } = req.params;

  // Check if the milestone exists
  const isExist = await MilestoneServices.getSingleMilestoneFromDB(milestoneId);

  if (!isExist) {
    return sendResponse(res, {
      success: false,
      statusCode: HttpStatus.NOT_FOUND,
      message: 'Milestone not found!',
      data: null,
    });
  }

  await MilestoneServices.deleteMilestoneFromDB(milestoneId);

  sendResponse(res, {
    success: true,
    statusCode: HttpStatus.OK,
    message: 'Milestone deleted successfully!',
    data: null,
  });
});

// Controller to update a milestone
const updateMilestone = catchAsync(async (req: Request, res: Response) => {
  const { milestoneId } = req.params;
  const updateData = req.body;

  const parsedUpdateData = partialMilestoneValidationSchema.parse(updateData);

  const result = await MilestoneServices.updateMilestoneFromDB(
    milestoneId,
    parsedUpdateData,
  );

  if (!result) {
    return sendResponse(res, {
      success: false,
      statusCode: HttpStatus.NOT_FOUND,
      message: 'Milestone not found!',
      data: null,
    });
  }

  sendResponse(res, {
    success: true,
    statusCode: HttpStatus.OK,
    message: 'Milestone updated successfully!',
    data: result,
  });
});

// Exporting milestone controllers
export const MilestoneControllers = {
  createMilestone,
  getAllMilestones,
  getSingleMilestone,
  deleteMilestone,
  updateMilestone,
};