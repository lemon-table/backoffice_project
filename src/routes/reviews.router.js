import express from "express";
import { prisma } from "../utils/prisma/index.js";
import { ReviewsController } from "../controllers/reviews.controller.js";
import { ReviewsService } from "../services/reviews.service.js";
import { ReviewsRepository } from "../repositories/reviews.repository.js";
import AuthMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

// 의존성 주입
const reviewsRepository = new ReviewsRepository(prisma);
const reviewsService = new ReviewsService(reviewsRepository);
const reviewsController = new ReviewsController(reviewsService);

/**리뷰 등록 API */
router.post("/:bookingId", AuthMiddleware, reviewsController.createReview);

/**리뷰 조회 API */
router.get("/:bookingId", reviewsController.readReviews);

/**리뷰 수정 API */
router.put("/:bookingId", AuthMiddleware, reviewsController.updateReview);

/**리뷰 삭제 API */
router.delete("/:bookingId", AuthMiddleware, reviewsController.deleteReview);

export default router;
