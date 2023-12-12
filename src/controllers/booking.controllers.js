import { BookingService } from "../services/booking.service.js"
import { StatusCodes } from "../constants/statusCodes.constant.js";


export class BookingController {

    bookingService = new BookingService();

    // 예약 생성
    createBookingController = async (req, res, next) => {
        try {
            const { UserId } = req.user;
            const { title, sitterId, content, bookedAt } = req.body;
            const booking = await this.bookingService.createBookingService(
                UserId,
                title,
                sitterId,
                content,
                bookedAt
            );

            return res.status(StatusCodes.CREATED).json({
                success: true,
                message: "예약이 완료되었습니다.",
                data: booking
            });
        } catch (err) {
            next(err);
        }
    };


    // 예약 전체 조회
    getBookingListController = async (req, res, next) => {
        try {
            const { sort } = req.query;
            const bookings = await this.bookingService.getBookingListService(
                sort
            );

            return res.status(StatusCodes.OK).json({
                success: true,
                message: "전체 예약이 조회되었습니다.",
                data: bookings,
            });
        } catch (err) {
            next(err);
        }
    };


    // 예약 상세 조회
    getBookingIdController = async (req, res, next) => {
        try {
            const { bookingId } = req.params;
            const booking = await this.bookingService.getBookingIdService(
                bookingId
            );

            return res.status(StatusCodes.OK).json({
                success: true,
                message: "예약 상세페이지가 조회되었습니다.",
                data: booking,
            });
        } catch (err) {
            next(err);
        }
    };


    // 예약 수정
    updateBookingController = async (req, res, next) => {
        try {
            const { UserId } = req.query;
            const { bookingId } = req.params;
            const { title, sitterId, content, bookedAt } = req.body;
            const updateBooking = await this.bookingService.updateBookingService(
                UserId,
                bookingId,
                title,
                sitterId,
                content,
                bookedAt
            );
            return res.status(StatusCodes.OK).json({
                success: true,
                message: "예약이 수정되었습니다.",
                data: updateBooking,
            });
        } catch (err) {
            next(err);
        }
    };


    // 예약 삭제
    deleteBookingController = async (req, res, next) => {
        try {
            const { UserId } = req.query;
            const { bookingId } = req.params;
            const deleteBooking = await this.bookingService.deleteBookingService(
                UserId,
                bookingId);

            return res.status(StatusCodes.OK).json({
                success: true,
                message: "예약이 삭제되었습니다."
            });
        } catch (err) {
            next(err);
        }
    };

}
