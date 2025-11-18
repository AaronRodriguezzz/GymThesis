import { Router } from "express";
import { createNewAdmin, getAdmins, updateAdmin, disableAdmin, changePassword} from "../controllers/admin.controller.js";
import { adminRequireAuth } from "../middlewares/authMiddleware.js";

const router = Router();

router.post('/', adminRequireAuth, createNewAdmin);
router.get('/', adminRequireAuth, getAdmins);
router.put('/:id',adminRequireAuth, updateAdmin);
router.put('/password/:id',adminRequireAuth, changePassword );
router.put('/disable/:id', adminRequireAuth, disableAdmin);

const adminRoutes = router

export default adminRoutes;