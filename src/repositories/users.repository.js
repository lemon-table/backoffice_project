export class UsersRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }
  createUser = async (email, nickname, hashedPassword) => {
    const createUser = await this.prisma.users.create({
      data: {
        email,
        nickname,
        password: hashedPassword
      }
    });

    return createUser;
  };
  findUser = async (email) => {
    const user = await this.prisma.users.findUnique({
      where: { email: email }
    });

    return user;
  };

  createUserInfo = async (userId, gender, name, age) => {
    const createUserInfo = await this.prisma.userInfos.create({
      data: {
        userId: userId,
        gender,
        name,
        age: Number(age)
      }
    });

    return createUserInfo;
  };

  readUser = async (userId) => {
    const user = await this.prisma.userInfos.findUnique({
      where: { userId: +userId }
    });

    return user;
  };

  updateUser = async (userId, nickname) => {
    const updateUser = await this.prisma.users.update({
      where: { userId: +userId },
      data: {
        nickname
      }
    });
    return updateUser;
  };
  updateUserInfo = async (userId, name, age, gender, profileImage) => {
    const updateUserInfo = await this.prisma.userInfos.update({
      where: { userId: +userId },
      data: {
        name,
        age,
        gender,
        profileImage
      }
    });
    return updateUserInfo;
  };
}
