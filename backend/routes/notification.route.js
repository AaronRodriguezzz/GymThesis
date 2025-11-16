import { Router } from "express";
import { userRequireAuth } from "../middlewares/authMiddleware.js";
import { getAllNotifications, readNotification } from "../controllers/notification.controller.js";
const router = Router();

router.get('/', userRequireAuth, getAllNotifications);
router.put('/:id', userRequireAuth, readNotification);

const notificationRoutes = router

export default notificationRoutes;