import { Router } from "express";
import { SubProcessController } from "../controllers/subProcessController";

const subProcessController = new SubProcessController();
const router = Router();

// GETTERS
router.get('/', subProcessController.getSubProcesses.bind(subProcessController));
router.get('/name/:name', subProcessController.getSubProcessByName.bind(subProcessController));
router.get('/:id', subProcessController.getSubProcessById.bind(subProcessController));

// POST
router.post('/', subProcessController.createSubProcess.bind(subProcessController));

// UPDATES
router.put('/:id', subProcessController.updateSubProcess.bind(subProcessController));

// DELETE
router.delete('/:id', subProcessController.deleteSubProcess.bind(subProcessController));

export { router as subProcessRoutes };
