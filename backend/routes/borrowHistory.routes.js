import { Router } from "express";
import { createBorrowHistory, getBorrowHistory, getBorrowHistoryById, updateBorrowHistory } from "../controllers/borrowHistory.controller.js";
import { userRequireAuth } from "../middlewares/authMiddleware.js";

const router = Router();

router.post('/', userRequireAuth, createBorrowHistory);
router.put('/:id', userRequireAuth, updateBorrowHistory);
router.get('/:id', userRequireAuth, getBorrowHistoryById);
router.get('/', userRequireAuth, getBorrowHistory);

const borrowHistoryRoutes = router

export default borrowHistoryRoutes;