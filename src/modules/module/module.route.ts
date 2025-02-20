import express from 'express';
import { ModuleControllers } from './module.controller';

const router = express.Router();

// Route to create or post a new module
router.post('/create-module', ModuleControllers.createModule);

// Route to get all module
router.get('/all-modules', ModuleControllers.getAllModules);

// Route to get a single module
router.get('/:moduleId', ModuleControllers.getSingleModule);

// Route to delete a single module
router.delete('/:moduleId', ModuleControllers.deleteModule);

// Route to update a single module
router.put('/:moduleId', ModuleControllers.updateModule);

export const ModuleRoute = router;
