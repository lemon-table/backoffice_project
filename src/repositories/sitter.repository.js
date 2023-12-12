export class SittersRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  createSitter = async (name, career) => {
    try {
      const createdSitter = await this.prisma.petsitter.create({
        data: {
          name,
          career
        }
      });

      return createdSitter;
    } catch (error) {
      console.error(error);
      throw new Error("펫시터 생성 중 에러가 발생했습니다.");
    }
  };
}
