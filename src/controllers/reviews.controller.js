import { StatusCodes } from "../constants/statusCodes.constant.js";

export class ReviewsController {
  constructor(reviewsService) {
    this.reviewsService = reviewsService;
  }
  /** 리뷰 등록 API */
  createReview = async (req, res, next) => {
    try {
      const { userId } = req.user;
      const { bookingId } = req.params;
      const { review, star } = req.body;

      const createReview = await this.reviewsService.createReview(userId, bookingId, review, star);

      return res.status(StatusCodes.CREATED).json({
        success: true,
        message: "리뷰 등록 되었습니다.",
        data: createReview
      });
    } catch (err) {
      next(err);
    }
  };

  /** 리뷰 조회 API */
  readReviews = async (req, res, next) => {
    try {
      const { bookingId } = req.params;
      const readReviews = await this.reviewsService.readReviews(bookingId);

      return res.status(StatusCodes.OK).json({
        success: true,
        message: "리뷰 목록이 조회되었습니다.",
        data: readReviews
      });
    } catch (err) {
      next(err);
    }
  };

  /** 리뷰 수정 API */
  updateReview = async (req, res, next) => {
    try {
      const { userId } = req.user;
      const { bookingId } = req.params;
      const { review, star, reviewId, reviewUserId } = req.body;
      const updateReview = await this.reviewsService.updateReview(
        userId,
        bookingId,
        reviewId,
        review,
        star,
        reviewUserId
      );

      return res.status(StatusCodes.OK).json({
        success: true,
        message: "리뷰 정보를 수정했습니다."
      });
    } catch (err) {
      next(err);
    }
  };

  /** 리뷰 삭제 API */
  deleteReview = async (req, res, next) => {
    try {
      const { userId } = req.user;
      const { bookingId } = req.params;
      const { reviewId, reviewUserId } = req.body;

      const deleteReview = await this.reviewsService.deleteReview(userId, bookingId, reviewId, reviewUserId);

      return res.status(StatusCodes.OK).json({
        success: true,
        message: "리뷰 정보를 삭제했습니다."
      });
    } catch (err) {
      next(err);
    }
  };
}
