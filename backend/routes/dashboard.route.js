import { Router } from "express";
import { getDashboardCardsData, getDashboardGraphData } from "../controllers/dashboard.controller.js";
import { adminRequireAuth } from "../middlewares/authMiddleware.js";

const router = Router();

router.get('/cards', adminRequireAuth, getDashboardCardsData);
router.get('/graph', adminRequireAuth, getDashboardGraphData);

const dashboardRoutes = router

export default dashboardRoutes;