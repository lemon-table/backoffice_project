import { StatusCodes } from "../constants/statusCodes.constant.js";

export class UsersController {
  constructor(usersService) {
    this.usersService = usersService;
  }
  /** 회원가입 API */
  createUser = async (req, res, next) => {
    try {
      const { email, nickname, password, confirmPassword, gender, name, age } =
        req.body;

      const user = await this.usersService.createUser(
        email,
        nickname,
        password,
        confirmPassword,
        gender,
        name,
        age
      );

      return res.status(StatusCodes.CREATED).json({
        success: true,
        message: "회원가입에 성공했습니다.",
        data: user,
      });
    } catch (err) {
      next(err);
    }
  };

  /** 로그인 API */
  loginUser = async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const user = await this.usersService.loginUser(email, password);

      if (user) res.cookie("authorization", `Bearer ${user.token}`);

      return res.status(StatusCodes.OK).json({
        success: true,
        message: "로그인에 성공했습니다.",
      });
    } catch (err) {
      next(err);
    }
  };
}
