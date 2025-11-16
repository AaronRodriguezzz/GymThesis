import { Router } from "express";
import { createEquipment, getEquipmentById, getEquipments, updateEquipment } from "../controllers/equipment.controller.js";
import { userRequireAuth } from "../middlewares/authMiddleware.js";

const router = Router();

router.post('/', userRequireAuth, createEquipment);
router.get('/', userRequireAuth, getEquipments);
router.get('/:id', userRequireAuth, getEquipmentById);
router.put('/:id', userRequireAuth, updateEquipment);

const equipmentsRoutes = router

export default equipmentsRoutes;