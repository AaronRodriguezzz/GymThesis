import { Router } from "express";
import { createNewAdmin } from "../controllers/admin.controller.js";

const router = Router();

router.post('/', createNewAdmin);

const adminRoutes = router

export default adminRoutes;