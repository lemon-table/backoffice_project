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
}
