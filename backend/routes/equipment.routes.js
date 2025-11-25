import { Router } from "express";
import { createEquipment, getEquipmentById, getEquipments, getTopBorrowedEquipment, updateEquipment } from "../controllers/equipment.controller.js";
import { adminRequireAuth, userRequireAuth } from "../middlewares/authMiddleware.js";

const router = Router();

router.post('/', userRequireAuth, createEquipment);
router.get('/', userRequireAuth, getEquipments);
router.get('/top-borrowed', adminRequireAuth, getTopBorrowedEquipment);
router.get('/:id', userRequireAuth, getEquipmentById);
router.put('/:id', userRequireAuth, updateEquipment);

const equipmentsRoutes = router

export default equipmentsRoutes;