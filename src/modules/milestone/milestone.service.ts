import { TMilestone } from './milestone.interface';
import { MilestoneModel } from './milestone.model';

// Service for creating a milestone
const createMilestoneIntoDB = async (milestone: TMilestone) => {
  const result = await MilestoneModel.create(milestone);
  return result;
};

// Service for getting all milestones or searching by a value
const getAllMilestonesFromDB = async (searchTerm: object): Promise<TMilestone[] | null> => {
  const result = await MilestoneModel.find(searchTerm);
  return result;
};

// Service for retrieving a single milestone
const getSingleMilestoneFromDB = async (_id: string) => {
  const result = await MilestoneModel.findOne({ _id });
  return result;
};

// Service for deleting a milestone
const deleteMilestoneFromDB = async (_id: string) => {
  const result = await MilestoneModel.findByIdAndUpdate(
    { _id },
    { isDeleted: true },
    { new: true, runValidators: true }
);
  return result;
};

// Service for updating a milestone
const updateMilestoneFromDB = async (
  _id: string,
  updateData: Partial<TMilestone>
) => {
  try {
    const result = await MilestoneModel.findOneAndUpdate(
      { _id },
      updateData,
      {
        new: true,
        runValidators: true,
      }
    ).exec();
    return result;
  } catch (error) {
    console.error(`Failed to update milestone with id ${_id}:`, error);
    throw error;
  }
};

// Exporting the main service for use in controllers
export const MilestoneServices = {
  createMilestoneIntoDB,
  getAllMilestonesFromDB,
  getSingleMilestoneFromDB,
  deleteMilestoneFromDB,
  updateMilestoneFromDB,
};
