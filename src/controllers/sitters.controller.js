import { StatusCodes } from "../constants/statusCodes.constant.js";

export class SittersController {
  constructor(sittersService) {
    this.sittersService = sittersService;
  }

  //시터등록 API

  createSitter = async (req, res, next) => {
    try {
      const { name, career } = req.body;

      const sitter = await this.sittersService.createSitter(name, career);

      return res.status(StatusCodes.CREATED).json({ success: true, message: "시터등록에 성공했습니다.", data: sitter });
    } catch (err) {
      next(err);
    }
  };

  //펫시터 전체조회API
  readSitter = async (req, res, next) => {
    try {
      const sitters = await this.sittersService.readSitter();
      return res
        .status(StatusCodes.OK)
        .json({ success: true, message: "시터 전체 조회에 성공했습니다.", data: sitters });
    } catch (err) {
      next(err);
    }
  };

  //펫시터 상세조회API
  readOneSitter = async (req, res, next) => {
    try {
      const { sitterId } = req.params;
      const sitters = await this.sittersService.readOneSitter(Number(sitterId));
      return res
        .status(StatusCodes.OK)
        .json({ success: true, message: "해당 시터 조회에 성공했습니다.", data: sitters });
    } catch (err) {
      next(err);
    }
  };

  /**펫시터 정보수정 API */
  updateSitter = async (req, res, next) => {
    try {
      const { sitterId } = req.params;
      const { name, career } = req.body;

      const sitter = await this.sittersService.updateSitter(Number(sitterId), name, career);

      return res.status(StatusCodes.OK).json({
        success: true,
        message: "해당 시터 정보가 수정되었습니다.",
        data: sitter
      });
    } catch (err) {
      next(err);
    }
  };

  /**펫시터 정보삭제 API */
  deleteSitter = async (req, res, next) => {
    try {
      const { sitterId } = req.params;

      const sitter = await this.sittersService.deleteSitter(Number(sitterId));

      return res.status(StatusCodes.OK).json({
        success: true,
        message: "해당 시터 정보가 삭제되었습니다.",
        data: sitter
      });
    } catch (err) {
      next(err);
    }
  };
}
