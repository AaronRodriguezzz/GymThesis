import { Router } from "express";
import { createBorrowHistory, getBorrowHistory, getBorrowHistoryById, updateBorrowHistory } from "../controllers/borrowHistory.controller.js";

const router = Router();

router.post('/', createBorrowHistory);
router.put('/:id', updateBorrowHistory);
router.get('/:id', getBorrowHistoryById);
router.get('/', getBorrowHistory);

const borrowHistoryRoutes = router

export default borrowHistoryRoutes;