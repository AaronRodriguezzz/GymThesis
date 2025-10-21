import { Router } from "express";
import { getDashboardCardsData, getDashboardGraphData } from "../controllers/dashboard.controller.js";

const router = Router();

router.get('/cards', getDashboardCardsData);
router.get('/graph', getDashboardGraphData);

const dashboardRoutes = router

export default dashboardRoutes;