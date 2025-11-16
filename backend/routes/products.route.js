import { Router } from "express";
import { createProduct, getProductById, getProducts, updateProduct, soldProduct, getProductSales } from "../controllers/products.controller.js";
import { userRequireAuth } from "../middlewares/authMiddleware.js";
const router = Router();

router.post('/', userRequireAuth, createProduct);
router.get('/', userRequireAuth, getProducts);
router.get('/sales', userRequireAuth, getProductSales);
router.get('/:id', userRequireAuth, getProductById);
router.put('/:id', userRequireAuth, updateProduct);
router.put('/', userRequireAuth, soldProduct)

const equipmentsRoutes = router

export default equipmentsRoutes;