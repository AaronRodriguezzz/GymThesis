import { Router } from "express";
import { createEquipment, getEquipments, updateEquipment } from "../controllers/equipment.controller.js";

const router = Router();

router.post('/', createEquipment);
router.get('/', getEquipments);
router.put('/:id', updateEquipment);

const equipmentsRoutes = router

export default equipmentsRoutes;