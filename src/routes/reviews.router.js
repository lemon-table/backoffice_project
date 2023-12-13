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

export default router;
