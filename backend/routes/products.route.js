import { Router } from "express";
import { createProduct, getProductById, getProducts, updateProduct, soldProduct } from "../controllers/products.controller.js";

const router = Router();

router.post('/', createProduct);
router.get('/', getProducts);
router.get('/:id', getProductById);
router.put('/:id', updateProduct);
router.put('/sold', soldProduct)

const equipmentsRoutes = router

export default equipmentsRoutes;