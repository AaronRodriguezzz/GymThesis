import { Router } from "express";
import { userRequireAuth } from "../middlewares/authMiddleware.js";
import { getAllNotifications } from "../controllers/notification.controller.js";
const router = Router();

router.get('/', userRequireAuth, getAllNotifications);

const notificationRoutes = router

export default notificationRoutes;