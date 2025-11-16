import { Router } from "express";
import { createMembership, updateMembership, getMemberships, updateMember } from "../controllers/member.controller.js";
import { userRequireAuth } from "../middlewares/authMiddleware.js";

const router = Router();

router.post('/', createMembership);
router.put('/:id', userRequireAuth, updateMembership);
router.put(`/data/:id`, userRequireAuth, updateMember);
router.get('/', userRequireAuth, getMemberships);


const memberRoutes = router

export default memberRoutes;