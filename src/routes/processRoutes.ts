import { Router } from "express";
import { ProcessController } from "../controllers/processController";

const processController = new ProcessController();
const router = Router();

// GETTERS
router.get('/', processController.getProcesses.bind(processController));
router.get('/name/:name', processController.getProcessByName.bind(processController));
router.get('/:id', processController.getProcessById.bind(processController));

// POST
router.post('/', processController.createProcess.bind(processController));

// UPDATES
router.put('/:id', processController.updateProcess.bind(processController));

// DELETE
router.delete('/:id', processController.deleteProcess.bind(processController));

export { router as processRoutes };
