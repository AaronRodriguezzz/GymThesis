import { Router } from "express";
import { createMembership, updateMembership } from "../controllers/member.controller.js";

const router = Router();

router.post('/', createMembership);
router.put('/:id', updateMembership);

const memberRoutes = router

export default memberRoutes;