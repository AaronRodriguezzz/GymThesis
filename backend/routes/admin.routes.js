import { Router } from "express";
import { createNewAdmin, getAdmins, updateAdmin, disableAdmin, getAdmin } from "../controllers/admin.controller.js";
import { adminRequireAuth } from "../middlewares/authMiddleware.js";

const router = Router();

router.post('/', adminRequireAuth, createNewAdmin);
router.get('/', adminRequireAuth, getAdmins);
router.get('/me', adminRequireAuth, getAdmin);
router.put('/:id', updateAdmin);
router.put('/disable/:id', adminRequireAuth, disableAdmin);

const adminRoutes = router

export default adminRoutes;