export class BookingsRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  // 신규 예약 생성
  createBookingRepo = async (userId, title, sitterId, content, bookedAt) => {
    const createBooking = await this.prisma.bookings.create({
      data: {
        userId,
        title,
        sitterId: +sitterId,
        content,
        bookedAt
      }
    });
    return createBooking;
  };

  // 예약 전체 조회
  getBookingsRepo = async (sort) => {
    const getBookingLists = await this.prisma.bookings.findMany({
      select: {
        bookingId: true,
        title: true,
        bookedAt: true,
        createdAt: true
      },
      orderBy: {
        createdAt: sort ? sort : "desc"
      }
    });
    return getBookingLists;
  };

  // 예약 상세 조회
  getBookingDetailRepo = async (bookingId) => {
    const bookingDetail = await this.prisma.bookings.findFirst({
      select: {
        bookingId: true,
        userId: true,
        User: { select: { nickname: true } },
        title: true,
        sitterId: true,
        content: true,
        bookedAt: true
      },
      where: { bookingId: +bookingId }
    });
    return bookingDetail;
  };

  // 예약 수정
  updateBookingRepo = async (userId, bookingId, title, sitterId, content, bookedAt) => {
    const updateBooking = await this.prisma.bookings.update({
      where: {
        userId: +userId,
        bookingId: +bookingId
      },
      data: {
        title: title,
        sitterId: +sitterId,
        content: content,
        bookedAt: bookedAt
      }
    });
    return updateBooking;
  };

  // 예약 삭제
  deleteBookingRepo = async (userId, bookingId) => {
    const deleteBooking = await this.prisma.bookings.delete({
      where: {
        userId: +userId,
        bookingId: +bookingId
      }
    });
    return deleteBooking;
  };
}
