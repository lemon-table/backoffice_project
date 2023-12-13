import express from "express";
import AuthMiddleware from "../middlewares/auth.middleware.js";
import { BookingsController } from "../controllers/bookings.controllers.js";

const router = express.Router();

const bookingsController = new BookingsController;

// 신규 예약 생성
router.post("/booking", AuthMiddleware, bookingsController.createBookingController);

// 예약 전체 조회
router.post("/booking", bookingsController.getBookingListController);

// 예약 상세 조회
router.post("/booking/:bookingId", bookingsController.getBookingIdController);

// 예약 수정
router.post("/booking/:bookingId", AuthMiddleware, bookingsController.updateBookingController);

// 예약 삭제
router.post("/booking/:bookingId", AuthMiddleware, bookingsController.deleteBookingController);


export default router;
