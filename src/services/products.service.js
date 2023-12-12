export class ProductsService {
  constructor(productsRepository) {
    this.productsRepository = productsRepository;
  }

  createProduct = async (userId, title, content) => {
    // 사용자ID 체크
    if (!userId) throw new Error("USER_ID_NOT_FOUND_ERROR");
    // 글제목 체크
    if (!title) throw new Error("TITLE_NOT_FOUND_ERROR");
    // 글내용 체크
    if (!content) throw new Error("CONTENT_NOT_FOUND_ERROR");

    const product = await this.productsRepository.createProduct(
      userId,
      title,
      content
    );

    return {
      status: product.status,
      productId: product.productId,
      userId: product.UserId,
      title: product.title,
      content: product.content,
      createdAt: product.createdAt,
    };
  };

  readProducts = async (sort) => {
    const sortStr = sort ? sort.toLowerCase() : null;

    if (sortStr !== null && sortStr !== "desc" && sortStr !== "asc") {
      throw new Error("INVALID_SORT_ERROR");
    }
    const products = await this.productsRepository.readProducts(sortStr);

    const formattedProducts = products.map((product) => ({
      productId: product.productId,
      title: product.title,
      status: product.status,
      createdAt: product.createdAt,
      nickname: product.User.nickname,
    }));

    return {
      formattedProducts,
    };
  };

  readDetProduct = async (Id) => {
    const product = await this.productsRepository.readDetProduct(Id);

    if (!product) throw new Error("PRODUCT_DETAIL_NOT_FOUND_ERROR");

    return {
      productId: product.productId,
      title: product.title,
      content: product.content,
      status: product.status,
      createdAt: product.createdAt,
      nickname: product.User.nickname,
    };
  };

  updateProduct = async (userId, Id, title, content, status) => {
    // status 값이 FOR_SALE 또는 SOLD_OUT이 아니면 에러 처리
    const upperCaseStatus = status.toUpperCase();
    if (upperCaseStatus !== "FOR_SALE" && upperCaseStatus !== "SOLD_OUT") {
      throw new Error("INVALID_PRODUCT_STATUS_ERROR");
    }
    // 사용자ID 체크
    if (!userId) throw new Error("USER_ID_NOT_FOUND_ERROR");
    // 글제목 체크
    if (!title) throw new Error("TITLE_NOT_FOUND_ERROR");
    // 글내용 체크
    if (!content) throw new Error("CONTENT_NOT_FOUND_ERROR");

    const product = await this.productsRepository.readDetProduct(Id);

    if (!product) throw new Error("PRODUCT_DETAIL_NOT_FOUND_ERROR");

    // 글 수정 권한 없는 사용자의 경우
    if (Number(product.UserId) !== userId)
      throw new Error("NO_PERMISSION_TO_UPDATE_PRODUCT_ERROR");

    const uptProduct = await this.productsRepository.updateProduct(
      userId,
      Id,
      title,
      content,
      status
    );

    return {
      uptProduct,
    };
  };

  deleteProduct = async (userId, Id) => {
    const product = await this.productsRepository.readDetProduct(Id);

    if (!product) throw new Error("PRODUCT_DETAIL_NOT_FOUND_ERROR");

    // 글 수정 권한 없는 사용자의 경우
    if (Number(product.UserId) !== userId)
      throw new Error("NO_PERMISSION_TO_UPDATE_PRODUCT_ERROR");

    const delProduct = await this.productsRepository.deleteProduct(userId, Id);

    return {
      delProduct,
    };
  };
}
