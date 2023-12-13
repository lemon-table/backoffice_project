import express from "express";
import AuthMiddleware from "../middlewares/auth.middleware.js";
import { BookingController } from "../controllers/booking.controllers.js";

const router = express.Router();

const bookingController = new BookingController;

// 신규 예약 생성
router.post("/booking", AuthMiddleware, bookingController.createBookingController);

// 예약 전체 조회
router.post("/booking", bookingController.getBookingListController);

// 예약 상세 조회
router.post("/booking/:bookingId", bookingController.getBookingIdController);

// 예약 수정
router.post("/booking/:bookingId", AuthMiddleware, bookingController.updateBookingController);

// 예약 삭제
router.post("/booking/:bookingId", AuthMiddleware, bookingController.deleteBookingController);


export default router;
