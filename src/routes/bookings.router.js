import AuthMiddleware from "../middlewares/auth.middleware.js";
import express from "express";
import { BookingsController } from "../controllers/bookings.controllers.js";
import { BookingsRepository } from "../repositories/bookings.repository.js";
import { BookingsService } from "../services/bookings.service.js";
import { prisma } from "../utils/prisma/index.js";

const router = express.Router();

// 의존성 주입
const bookingsRepository = new BookingsRepository(prisma);
const bookingsService = new BookingsService(bookingsRepository);
const bookingsController = new BookingsController(bookingsService);


// 신규 예약 생성
router.post("/booking", AuthMiddleware, bookingsController.createBookingController);

// 예약 전체 조회
router.post("/booking", bookingsController.getBookingListController);

// 예약 상세 조회
router.post("/booking/:bookingId", bookingsController.getBookingDetailController);

// 예약 수정
router.post("/booking/:bookingId", AuthMiddleware, bookingsController.updateBookingController);

// 예약 삭제
router.post("/booking/:bookingId", AuthMiddleware, bookingsController.deleteBookingController);


export default router;
