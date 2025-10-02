import { Router } from "express";
import { createNewAdmin, getAdmins, updateAdmin } from "../controllers/admin.controller.js";

const router = Router();

router.post('/', createNewAdmin);
router.get('/', getAdmins);
router.put('/:id', updateAdmin);

const adminRoutes = router

export default adminRoutes;