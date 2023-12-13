export class SittersService {
  constructor(sittersRepository) {
    this.sittersRepository = sittersRepository;
  }

  //시터등록 API

  createSitter = async (name, career) => {
    const createdSitter = await this.sittersRepository.createSitter(name, career);

    return {
      sitterId: createdSitter.sitterId,
      name: createdSitter.name,
      career: createdSitter.career,
      createdAt: createdSitter.createdAt,
      updatedAt: createdSitter.updatedAt
    };
  };

  //펫시터 전체조회API
  readSitter = async () => {
    const sitters = await this.sittersRepository.readAllSitters();
    sitters.sort((a, b) => {
      return b.createdAt.getTime() - a.createdAt.getTime();
    });

    return sitters.map((sitter) => {
      return {
        sitterId: sitter.sitterId,
        name: sitter.name,
        career: sitter.career,
        createdAt: sitter.createdAt,
        updatedAt: sitter.updatedAt
      };
    });
  };

  //펫시터 상세조회API
  readOneSitter = async (sitterId) => {
    const oneSitter = await this.sittersRepository.readOneSitter(sitterId);

    //시터가 존재하지 않을때
    if (!oneSitter) throw new Error("해당 펫시터를 찾을 수 없습니다.");

    return {
      sitterId: oneSitter.sitterId,
      name: oneSitter.name,
      career: oneSitter.career,
      createdAt: oneSitter.createdAt,
      updatedAt: oneSitter.updatedAt
    };
  };
  /**펫시터 정보수정 API */
  updateSitter = async (sitterId, name, career) => {
    //시터가 존재하지 않을때
    const oneSitter = await this.sittersRepository.readOneSitter(sitterId);
    if (!oneSitter) throw new Error("해당 펫시터를 찾을 수 없습니다.");

    const sitter = await this.sittersRepository.updateSitter(sitterId, name, career);
    return sitter;
  };

  /**펫시터 정보삭제 API */
  deleteSitter = async (sitterId) => {
    //시터가 존재하지 않을때
    const oneSitter = await this.sittersRepository.readOneSitter(sitterId);
    if (!oneSitter) throw new Error("해당 펫시터를 찾을 수 없습니다.");

    const sitter = await this.sittersRepository.deleteSitter(sitterId);
    return sitter;
  };
}
