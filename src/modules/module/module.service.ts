import { TModule } from "./module.interface";
import { ModuleModel } from "./module.model";

// Service for creating a module
const createModuleIntoDB = async (module: TModule) => {
  const result = await ModuleModel.create(module);
  return result;
};

// Service for getting all module or searching by a value
const getAllModulesFromDB = async (searchTerm: object): Promise<TModule[] | null> => {
  const result = await ModuleModel.find(searchTerm);
  return result;
};

// Service for retrieving a single module
const getSingleModuleFromDB = async (_id: string) => {
  const result = await ModuleModel.findOne({ _id });
  return result;
};

// Service for deleting a module
const deleteModuleFromDB = async (_id: string) => {
  const result = await ModuleModel.findByIdAndUpdate(
    { _id },
    { isDeleted: true },
    { new: true, runValidators: true }
);
  return result;
};

// Service for updating a module
const updateModuleFromDB = async (
  _id: string,
  updateData: Partial<TModule>
) => {
  try {
    const result = await ModuleModel.findOneAndUpdate(
      { _id },
      updateData,
      {
        new: true,
        runValidators: true,
      }
    ).exec();
    return result;
  } catch (error) {
    console.error(`Failed to update module with id ${_id}:`, error);
    throw error;
  }
};

// Exporting the main service for use in controllers
export const ModuleServices = {
    createModuleIntoDB,
    getAllModulesFromDB,
    getSingleModuleFromDB,
    deleteModuleFromDB,
    updateModuleFromDB,
};
