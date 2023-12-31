import express from "express";
import { prisma } from "../utils/prisma/index.js";
import { UsersController } from "../controllers/users.controller.js";
import { UsersService } from "../services/users.service.js";
import { UsersRepository } from "../repositories/users.repository.js";
import AuthMiddleware from "../middlewares/auth.middleware.js";
import multer from "multer";

// 이미지를 저장할 경로와 파일 이름 정의
const fileUpload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024 // 5 MB 제한 (원하는 크기로 조절)
  }
});

const router = express.Router();

// 의존성 주입
const usersRepository = new UsersRepository(prisma);
const usersService = new UsersService(usersRepository);
const usersController = new UsersController(usersService);

/**사용자 프로필 이미지조회 API */
router.get("/getimage", AuthMiddleware, usersController.getUserImage);

/**사용자 프로필 수정 API */
router.post(
  "/putimage",
  AuthMiddleware,
  multer().fields([{ name: "image", maxCount: 1 }]),
  usersController.putUserImage
);

/**사용자 프로필 상세조회 API */
router.get("/:userId", AuthMiddleware, usersController.readUser);

/**사용자 프로필 수정 API */
router.put("/:userIdParam", AuthMiddleware, usersController.updateUser);

export default router;
