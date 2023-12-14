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

/**회원가입 API */
router.post("/signup", usersController.createUser);

/**로그인 API */
router.post("/signin", usersController.loginUser);

/**userId 가져오는 API */
router.get("/getid", AuthMiddleware, usersController.getUserId);

export default router;
