import express from "express";
import ProductsRouter from "./products.router.js";
import UsersRouter from "./users.router.js";
import AuthRouter from "./auth.router.js";
import SittersRouter from "./sitter.router.js";

const router = express.Router();

router.use("/products/", ProductsRouter);
router.use("/users/", UsersRouter);
router.use("/auth/", AuthRouter);
router.use("/sitter/", SittersRouter);


export default router;
