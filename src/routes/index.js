import express from "express";
import ProductsRouter from "./products.router.js";
import UsersRouter from "./users.router.js";
import AuthRouter from "./auth.router.js";

import BookingsRouter from "./bookings.router.js";
import SittersRouter from "./sitters.router.js";
import ReviewsRouter from "./reviews.router.js";

const router = express.Router();

router.use("/products/", ProductsRouter);
router.use("/users/", UsersRouter);
router.use("/auth/", AuthRouter);

router.use("/booking/", BookingsRouter);
router.use("/sitter/", SittersRouter);
router.use("/review/", ReviewsRouter);

export default router;
