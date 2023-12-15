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

  /*
  readAllSitters = async () => {
    const allSitters = await this.prisma.petsitters.findMany();
    return allSitters;
  };*/

  readAllSitters = async () => {
    const readAllSitters = await this.prisma.$queryRaw`SELECT a.*, COALESCE(b.popScore, 0) as popScore
      FROM petsitters a
      LEFT JOIN (
        SELECT b.sitterId, AVG(a.star) popScore
        FROM reviews a
        JOIN bookings b ON a.bookingId = b.bookingId
        GROUP BY b.sitterId
      ) b ON a.sitterId = b.sitterId`;

    return readAllSitters;
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
