import jwt from "jsonwebtoken";
import dotEnv from "dotenv";
import { prisma } from "../utils/prisma/index.js";

export default async function (req, res, next) {
  try {
    const { authorization } = req.cookies;

    const [tokenType, token] = authorization.split(" ");
    if (tokenType !== "Bearer") throw new Error("TOKEN_TYPE_ERROR");

    //.env에 있는 여러 값들을, prosess.env 객체 안에 추가하게 된다.
    dotEnv.config();

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userId = decodedToken.userId;

    const user = await prisma.users.findFirst({
      where: { userId: +userId },
    });

    if (!user) {
      res.clearCookie("authorization"); //특정 쿠키 삭제
      throw new Error("TOKEN_USER_NOT_FOUND_ERROR");
    }

    req.user = user;

    next(); // 다음 미들웨어 실행
  } catch (error) {
    res.clearCookie("authorization"); //특정 쿠키 삭제

    switch (
      error.name //에러 심화
    ) {
      case "TokenExpiredError": // 토큰 만료시 발생하는 에러
        return res.status(401).json({ message: "토큰이 만료되었습니다." });
        break;
      case "JsonWebTokenError": // 토큰이 검증 실패했을 때 발생하는 에러
        return res.status(401).json({ message: "토큰 인증에 실패하였습니다." });
        break;
      default:
        return res
          .status(401)
          .json({ message: error.message ?? "비 정상적인 요청입니다." });
    }
  }
}
