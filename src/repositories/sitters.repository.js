export class SittersRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  createSitter = async (name, career) => {
    try {
      const createdSitter = await this.prisma.petsitters.create({
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

  readAllSitters = async () => {
    const allSitters = await this.prisma.petsitters.findMany();
    return allSitters;
  };

  readOneSitter = async (sitterId) => {
    const oneSitter = await this.prisma.petsitters.findUnique({
      where: { sitterId }
    });
    return oneSitter;
  };

  updateSitter = async (sitterId, name, career) => {
    const updatedsitter = await this.prisma.petsitters.update({
      where: { sitterId },
      data: {
        name,
        career
      }
    });
    return updatedsitter;
  };

  deleteSitter = async (sitterId) => {
    const deletedSitter = await this.prisma.petsitters.delete({
      where: { sitterId }
    });
  };
}
