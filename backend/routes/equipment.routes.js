import { Router } from "express";
import { createEquipment, getEquipmentById, getEquipments, updateEquipment } from "../controllers/equipment.controller.js";

const router = Router();

router.post('/', createEquipment);
router.get('/', getEquipments);
router.get('/:id', getEquipmentById);
router.put('/:id', updateEquipment);

const equipmentsRoutes = router

export default equipmentsRoutes;