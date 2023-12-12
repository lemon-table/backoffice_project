import express from "express";
import ProductsRouter from "./products.router.js";
import UsersRouter from "./users.router.js";
import AuthRouter from "./auth.router.js";
import BookingRouter from "./booking.router.js";
import SitterRouter from "./sitter.router.js";
import ReviewRouter from "./review.router.js";

const router = express.Router();

router.use("/products/", ProductsRouter);
router.use("/users/", UsersRouter);
router.use("/auth/", AuthRouter);
router.use("/booking/", BookingRouter);
router.use("/sitter/", SitterRouter);
router.use("/review/", ReviewRouter);

export default router;
