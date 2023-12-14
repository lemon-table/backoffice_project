export class BookingsService {

    constructor(bookingsRepository) {
        this.bookingsRepository = bookingsRepository;
    };


    // 신규 예약 생성
    createBookingService = async (userId, title, sitterId, content, bookedAt) => {
        // userid 확인
        if (!userId) throw new Error("USER_ID_NOT_FOUND_ERROR");
        // title 확인
        if (!title) throw new Error("TITLE_NOT_FOUND_ERROR");
        // sitterId 확인
        if (!sitterId) throw new Error("PETSITTER_NOT_FOUND_ERROR");
        // content 확인
        if (!content) throw new Error("CONTENT_NOT_FOUND_ERROR");
        // bookedAt 확인
        if (!bookedAt) throw new Error("BOOKINGDATE_NOT_FOUND_ERROR");

        const booking = await this.bookingsRepository.createBookingRepo(
            userId,
            title,
            sitterId,
            content,
            bookedAt,
        );
        return {
            userId: booking.userId,
            title: booking.title,
            sitterId: booking.sitterId,
            content: booking.content,
            bookedAt: booking.bookedAt,
        };
    };


    // 예약 전체 조회
    getBookingListService = async (sort) => {
        const sortStr = sort ? sort.toLowerCase() : null;
        if (sortStr !== null && sortStr !== "desc" && sortStr !== "asc") {
            throw new Error("INVALID_SORT_ERROR");
        };
        const bookings = await this.bookingsRepository.getBookingsRepo(sortStr);

        // 예약 전체 조회 화면에서 글번호, 예약 제목, 작성시간 출력 
        const formattedBookings = bookings.map((booking) => ({
            bookingId: booking.bookingId,
            title: booking.title,
            createdAt: booking.createdAt,
        }));
        return { formattedBookings };
    };


    // 예약 상세 조회
    getBookingDetailService = async (bookingId) => {
        const booking = await this.bookingsRepository.getBookingDetailRepo(bookingId);
        console.log({ booking });
        if (!booking) throw new Error("BOOKING_NOT_FOUND_ERROR");

        return {
            bookingId: booking.bookingId,
            nickname: booking.User.nickname,
            title: booking.title,
            sitterId: booking.sitterId,
            content: booking.content,
            bookedAt: booking.bookedAt,
        };
    };


    // 예약 수정
    updateBookingService = async (userId, bookingId, title, sitterId, content, bookedAt) => {
        if (!userId) throw new Error("USER_ID_NOT_FOUND_ERROR");
        if (!title) throw new Error("TITLE_NOT_FOUND_ERROR");
        if (!sitterId) throw new Error("PETSITTER_NOT_FOUND_ERROR");
        if (!content) throw new Error("CONTENT_NOT_FOUND_ERROR");
        if (!bookedAt) throw new Error("BOOKINGDATE_NOT_FOUND_ERROR");

        const booking = await this.bookingsRepository.getBookingDetailRepo(bookingId);
        if (!booking) throw new Error("BOOKING_NOT_FOUND_ERROR");
        if (booking.userId !== +userId) throw new Error("NO_PERMISSION_TO_UPDATE_ERROR");

        const updateBooking = await this.bookingsRepository.updateBookingRepo(
            userId,
            bookingId,
            title,
            sitterId,
            content,
            bookedAt,
        );
        return { updateBooking };
    };


    // 예약 삭제
    deleteBookingService = async (userId, bookingId) => {
        const booking = await this.bookingsRepository.getBookingDetailRepo(bookingId);
        if (!booking) throw new Error("BOOKING_NOT_FOUND_ERROR");
        if (booking.userId !== +userId) throw new Error("NO_PERMISSION_TO_UPDATE_ERROR");

        const deleteBooking = await this.bookingsRepository.deleteBookingRepo(userId, bookingId);

        return { deleteBooking };
    };
};


