import express from "express";
import { prisma } from "../utils/prisma/index.js";
import { UsersController } from "../controllers/users.controller.js";
import { UsersService } from "../services/users.service.js";
import { UsersRepository } from "../repositories/users.repository.js";
import AuthMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

// 의존성 주입
const usersRepository = new UsersRepository(prisma);
const usersService = new UsersService(usersRepository);
const usersController = new UsersController(usersService);

/**사용자 프로필 상세조회 API */
router.get("/:userId", AuthMiddleware, usersController.readUser);

/**사용자 프로필 수정 API */
router.put("/:userIdParam", AuthMiddleware, usersController.updateUser);

export default router;
