import express from "express";
import { prisma } from "../utils/prisma/index.js";
import { ProductsController } from "../controllers/products.controller.js";
import { ProductsService } from "../services/products.service.js";
import { ProductsRepository } from "../repositories/products.repository.js";
import AuthMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

// 의존성 주입
const productsRepository = new ProductsRepository(prisma);
const productsService = new ProductsService(productsRepository);
const productsController = new ProductsController(productsService);

/**상품 등록 API */
router.post("/", AuthMiddleware, productsController.createProduct);

/**상품 조회 API */
router.get("/", productsController.readProducts);

/**상품 상세 조회 API */
router.get("/:Id", productsController.readDetProduct);

/**상품 수정 API */
router.put("/:Id", AuthMiddleware, productsController.updateProduct);

/**상품 삭제 API */
router.delete("/:Id", AuthMiddleware, productsController.deleteProduct);

export default router;
