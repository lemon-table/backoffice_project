import { StatusCodes } from "../constants/statusCodes.constant.js";

export default function (err, req, res, next) {
  console.error("err:" + err.message);

  let statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
  let errMessage = "서버 내부 에러가 발생했습니다.";

  if (err.message === "PASSWORD_LENGTH_ERROR") {
    statusCode = StatusCodes.BAD_REQUEST;
    errMessage = "비밀번호는 6자리 이상 작성 바랍니다.";
  }

  if (err.message === "PASSWORD_MISMATCH") {
    statusCode = StatusCodes.BAD_REQUEST;
    errMessage = "패스워드가 패스워드 확인란과 다릅니다.";
  }

  if (err.message === "INVALID_EMAIL_FORMAT") {
    statusCode = StatusCodes.BAD_REQUEST;
    errMessage = "이메일 형식이 맞지 않습니다.";
  }

  if (err.message === "EMAIL_ALREADY_IN_USE") {
    statusCode = StatusCodes.UNAUTHORIZED;
    errMessage = "이메일이 이미 사용중입니다.";
  }

  if (err.message === "INVALID_CREDENTIALS") {
    statusCode = StatusCodes.BAD_REQUEST;
    errMessage = "이메일 또는 패스워드가 틀렸습니다.";
  }

  if (err.message === "TOKEN_USER_NOT_FOUND_ERROR") {
    statusCode = StatusCodes.UNAUTHORIZED;
    errMessage = "토큰 사용자가 존재하지 않습니다.";
  }

  if (err.message === "USER_ID_NOT_FOUND_ERROR") {
    statusCode = StatusCodes.BAD_REQUEST;
    errMessage = "사용자 ID가 없습니다.";
  }

  if (err.message === "TITLE_NOT_FOUND_ERROR") {
    statusCode = StatusCodes.BAD_REQUEST;
    errMessage = "글제목이 없습니다.";
  }

  if (err.message === "CONTENT_NOT_FOUND_ERROR") {
    statusCode = StatusCodes.BAD_REQUEST;
    errMessage = "글내용이 없습니다.";
  }

  if (err.message === "INVALID_SORT_ERROR") {
    statusCode = StatusCodes.BAD_REQUEST;
    errMessage = "전체조회 정렬은 asc, desc만 기입 가능합니다.";
  }

  if (err.message === "PRODUCT_DETAIL_NOT_FOUND_ERROR") {
    statusCode = StatusCodes.BAD_REQUEST;
    errMessage = "상품ID의 상세정보가 없습니다.";
  }

  if (err.message === "INVALID_PRODUCT_STATUS_ERROR") {
    statusCode = StatusCodes.BAD_REQUEST;
    errMessage = "status 값은 FOR_SALE 또는 SOLD_OUT만 기입 가능합니다.";
  }

  if (err.message === "NO_PERMISSION_TO_UPDATE_ERROR") {
    statusCode = StatusCodes.BAD_REQUEST;
    errMessage = "자료를 수정할 권한이 없습니다.";
  }

  res.status(statusCode).json({ success: false, errorMessage: errMessage });
}
