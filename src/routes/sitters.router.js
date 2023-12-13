import express from "express";
import { prisma } from "../utils/prisma/index.js";
import { SittersController } from "../controllers/sitters.controller.js";
import { SittersService } from "../services/sitters.service.js";
import { SittersRepository } from "../repositories/sitters.repository.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

// 의존성 주입
const sittersRepository = new SittersRepository(prisma);
const sittersService = new SittersService(sittersRepository);
const sittersController = new SittersController(sittersService);

/**펫시터 등록 API */
router.post("/", sittersController.createSitter);

/**펫시터 전체조회 API */
router.get("/", sittersController.readSitter);

/**펫시터 상세조회 API */
router.get("/:sitterId", sittersController.readOneSitter);

/**펫시터 정보수정 API */
router.put("/:sitterId", sittersController.updateSitter);

/**펫시터 정보삭제 API */
router.delete("/:sitterId", sittersController.deleteSitter);

export default router;
