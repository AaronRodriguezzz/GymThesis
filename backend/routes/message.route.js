import { sendMessage } from "../controllers/message.controller.js";
import { Router } from "express";
const router = Router();

router.post('/send', sendMessage);

export default router