import { Router } from "express";
import { createMembership, updateMembership, getMemberships, updateMember } from "../controllers/member.controller.js";

const router = Router();

router.post('/', createMembership);
router.put('/:id', updateMembership);
router.put('/data/:id', updateMember);
router.get('/', getMemberships);


const memberRoutes = router

export default memberRoutes;