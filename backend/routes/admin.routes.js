import { Router } from "express";
import { createNewAdmin, getAdmins, updateAdmin, disableAdmin } from "../controllers/admin.controller.js";

const router = Router();

router.post('/', createNewAdmin);
router.get('/', getAdmins);
router.put('/:id', updateAdmin);
router.put('/disable/:id', disableAdmin);

const adminRoutes = router

export default adminRoutes;