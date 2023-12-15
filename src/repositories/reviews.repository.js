export class ReviewsRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }
  createReview = async (userId, bookingId, review, star) => {
    const createReview = await this.prisma.reviews.create({
      data: {
        userId: +userId,
        bookingId: +bookingId,
        review,
        star
      }
    });

    return createReview;
  };

  readBooking = async (bookingId) => {
    const booking = await this.prisma.bookings.findUnique({
      where: { bookingId: +bookingId }
    });

    return booking;
  };

  readReviews = async (bookingId) => {
    const readReviews = await this.prisma.reviews.findMany({
      where: { bookingId: +bookingId }, // bookingId 기반 필터링
      select: {
        reviewId: true,
        userId: true,
        bookingId: true,
        review: true,
        star: true,
        createdAt: true,
        users: {
          select: {
            nickname: true
          }
        }
      },
      orderBy: {
        createdAt: "desc"
      }
    });
    return readReviews;
  };

  readDetReview = async (reviewId) => {
    const readReview = await this.prisma.reviews.findFirst({
      select: {
        reviewId: true,
        userId: true,
        bookingId: true,
        review: true,
        star: true,
        createdAt: true,
        user: {
          select: {
            nickname: true
          }
        }
      },
      where: { reviewId: +reviewId }
    });
    return readReview;
  };

  updateReview = async (userId, bookingId, reviewId, review, star) => {
    const updateReview = await this.prisma.reviews.update({
      where: { userId: +userId, bookingId: +bookingId, reviewId: +reviewId },
      data: {
        review: review,
        star: +star
      }
    });
    return updateReview;
  };

  deleteReview = async (userId, bookingId, reviewId) => {
    const deleteReview = await this.prisma.reviews.delete({
      where: { userId: +userId, bookingId: +bookingId, reviewId: +reviewId }
    });
    return deleteReview;
  };
}
