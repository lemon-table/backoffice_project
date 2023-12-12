export class UsersRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }
  createUser = async (email, nickname, hashedPassword) => {
    const createUser = await this.prisma.users.create({
      data: {
        email,
        nickname,
        password: hashedPassword,
      },
    });

    return createUser;
  };
  findUser = async (email) => {
    const user = await this.prisma.users.findUnique({
      where: { email: email },
    });

    return user;
  };

  createUserInfo = async (userId, gender, name, age) => {
    const createUserInfo = await this.prisma.userInfos.create({
      data: {
        UserId: userId,
        gender,
        name,
        age: Number(age),
      },
    });

    return createUserInfo;
  };
}
