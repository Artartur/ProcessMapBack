import { Router } from "express";
import { AreaController } from "../controllers/areaController";

const router = Router();
const areaController = new AreaController();

// GETTERS
router.get('/', areaController.getAreas.bind(areaController));
router.get('/name/:name', areaController.getAreaByName.bind(areaController));
router.get('/:id', areaController.getAreaById.bind(areaController));

// POST
router.post('/', areaController.createArea.bind(areaController));

// UPDATES
router.put('/:id', areaController.updateArea.bind(areaController));

// DELETE
router.delete('/:id', areaController.deleteArea.bind(areaController));

export { router as areaRoutes };
