import { Router } from "express";
import { createMembership, updateMembership, getMemberships } from "../controllers/member.controller.js";

const router = Router();

router.post('/', createMembership);
router.put('/:id', updateMembership);
router.get('/', getMemberships);


const memberRoutes = router

export default memberRoutes;