export class ReviewsService {
  constructor(reviewsRepository) {
    this.reviewsRepository = reviewsRepository;
  }

  createReview = async (userId, bookingId, review, star) => {
    // 사용자ID 체크
    if (!updateReviewserId) throw new Error("USER_ID_NOT_FOUND_ERROR");
    // 리뷰글 체크
    if (!review) throw new Error("REVIEW_NOT_FOUND_ERROR");
    // 평점 체크
    if (!star) throw new Error("STAR_NOT_FOUND_ERROR");

    const readBooking = await this.reviewsRepository.readBooking(bookingId);

    // 예약내역 체크
    if (!readBooking) throw new Error("BOOKING_NOT_FOUND_ERROR");

    const createReview = await this.reviewsRepository.createReview(userId, bookingId, review, star);

    return {
      createReview
    };
  };

  readReviews = async (bookingId) => {
    const reviews = await this.reviewsRepository.readReviews(bookingId);

    return {
      reviews
    };
  };

  updateReview = async (userId, bookingId, reviewId, review, star, reviewUserId) => {
    // 사용자ID 체크
    if (!userId) throw new Error("USER_ID_NOT_FOUND_ERROR");
    // 리뷰글 체크
    if (!review) throw new Error("REVIEW_NOT_FOUND_ERROR");
    // 평점 체크
    if (!star) throw new Error("STAR_NOT_FOUND_ERROR");

    console.log("reviewId:" + reviewId);

    // 글 수정 권한 없는 사용자의 경우
    if (Number(userId) !== Number(reviewUserId)) throw new Error("NO_PERMISSION_TO_UPDATE_ERROR");

    const readBooking = await this.reviewsRepository.readBooking(bookingId);

    // 예약내역 체크
    if (!readBooking) throw new Error("BOOKING_NOT_FOUND_ERROR");

    const detailRead = await this.reviewsRepository.readDetReview(reviewId);

    // 리뷰 존재여부 체크
    if (!detailRead) throw new Error("REVIEWID_NOT_FOUND_ERROR");

    console.log(detailRead);

    const uptReview = await this.reviewsRepository.updateReview(userId, bookingId, reviewId, review, star);

    return {
      uptReview
    };
  };

  deleteReview = async (userId, bookingId, reviewId, reviewUserId) => {
    // 글 수정 권한 없는 사용자의 경우
    if (Number(userId) !== Number(reviewUserId)) throw new Error("NO_PERMISSION_TO_UPDATE_ERROR");

    const readBooking = await this.reviewsRepository.readBooking(bookingId);

    // 예약내역 체크
    if (!readBooking) throw new Error("BOOKING_NOT_FOUND_ERROR");

    const detailRead = await this.reviewsRepository.readDetReview(reviewId);

    // 리뷰 존재여부 체크
    if (!detailRead) throw new Error("REVIEWID_NOT_FOUND_ERROR");

    const delProduct = await this.reviewsRepository.deleteReview(userId, bookingId, reviewId);

    return {
      delProduct
    };
  };
}
