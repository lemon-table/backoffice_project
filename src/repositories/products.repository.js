export class ProductsRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }
  createProduct = async (userId, title, content) => {
    const createProduct = await this.prisma.products.create({
      data: {
        UserId: userId,
        title,
        content,
      },
    });

    return createProduct;
  };

  readProducts = async (sort) => {
    const readProduct = await this.prisma.products.findMany({
      select: {
        productId: true,
        title: true,
        status: true,
        createdAt: true,
        User: {
          select: {
            nickname: true,
          },
        },
      },
      orderBy: {
        createdAt: sort ? sort : "desc",
      },
    });
    return readProduct;
  };

  readDetProduct = async (Id) => {
    const readProduct = await this.prisma.products.findFirst({
      select: {
        productId: true,
        UserId: true,
        title: true,
        content: true,
        status: true,
        createdAt: true,
        User: {
          select: {
            nickname: true,
          },
        },
      },
      where: { productId: +Id },
    });
    return readProduct;
  };

  updateProduct = async (userId, Id, title, content, status) => {
    const updateProduct = await this.prisma.products.update({
      where: { productId: +Id, UserId: +userId },
      data: {
        title: title,
        content: content,
        status: status,
      },
    });
    return updateProduct;
  };

  deleteProduct = async (userId, Id) => {
    const deleteProduct = await this.prisma.products.delete({
      where: { productId: +Id, UserId: +userId },
    });
    return deleteProduct;
  };
}
