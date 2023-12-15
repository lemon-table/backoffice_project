import { StatusCodes } from "../constants/statusCodes.constant.js";
export class BookingsController {
  constructor(bookingsService) {
    this.bookingsService = bookingsService;
  }

  // 예약 생성
  createBookingController = async (req, res, next) => {
    try {
      const { userId } = req.user;
      const { title, sitterId, content, bookedAt } = req.body;
      const booking = await this.bookingsService.createBookingService(userId, title, sitterId, content, bookedAt);

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
      const bookings = await this.bookingsService.getBookingListService(sort);

      return res.status(StatusCodes.OK).json({
        success: true,
        message: "전체 예약이 조회되었습니다.",
        data: bookings
      });
    } catch (err) {
      next(err);
    }
  };

  // 예약 상세 조회
  getBookingDetailController = async (req, res, next) => {
    try {
      const { bookingId } = req.params;
      const booking = await this.bookingsService.getBookingDetailService(bookingId);

      return res.status(StatusCodes.OK).json({
        success: true,
        message: "예약 상세페이지가 조회되었습니다.",
        data: booking
      });
    } catch (err) {
      next(err);
    }
  };

  // 예약 수정
  updateBookingController = async (req, res, next) => {
    try {
      const { userId } = req.user;
      const { bookingId } = req.params;
      const { title, sitterId, content, bookedAt } = req.body;
      const updateBooking = await this.bookingsService.updateBookingService(
        userId,
        bookingId,
        title,
        sitterId,
        content,
        bookedAt
      );
      return res.status(StatusCodes.OK).json({
        success: true,
        message: "예약이 수정되었습니다.",
        data: updateBooking
      });
    } catch (err) {
      next(err);
    }
  };

  // 예약 삭제
  deleteBookingController = async (req, res, next) => {
    try {
      const { userId } = req.user;
      const { bookingId } = req.params;
      const deleteBooking = await this.bookingsService.deleteBookingService(userId, bookingId);

      return res.status(StatusCodes.OK).json({
        success: true,
        message: "예약이 삭제되었습니다."
      });
    } catch (err) {
      next(err);
    }
  };

  // 예약 펫시터별 조회
  getBookingSitterController = async (req, res, next) => {
    try {
      const { sitterId } = req.params;
      const booking = await this.bookingsService.getBookingSitterService(sitterId);

      return res.status(StatusCodes.OK).json({
        success: true,
        message: "펫시터별 예약 정보가 조회되었습니다.",
        data: booking
      });
    } catch (err) {
      next(err);
    }
  };
}
