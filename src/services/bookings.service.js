export class BookingService {

    constructor(bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    // 신규 예약 생성
    createBookingService = async (userId, title, sitterId, content, bookedAt) => {
        const booking = await this.bookingRepository.createBooking(
            userId,
            title,
            sitterId,
            content,
            bookedAt
        );

    }

    // 예약 전체 조회
    getBookingListService

    // 예약 상세 조회
    getBookingIdService

    // 예약 수정
    updateBookingService

    // 예약 삭제
    deleteBookingService
}