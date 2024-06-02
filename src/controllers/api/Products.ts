import { user } from '../..';

export async function getProducts() {
  const apiRoot = user.createApiRoot(user.ctpClientFlow);
  try {
    const response = await apiRoot.productProjections().get().execute();
    return response.body.results;
  } catch (error) {
    // alert(error);
    throw new Error((error as Error).message);
  }
}

export async function getProductID(ID: string) {
  const apiRoot = user.createApiRoot(user.ctpClientFlow);
  try {
    const response = await apiRoot.productProjections().withId({ ID }).get().execute();
    return response.body;
  } catch (error) {
    // alert(error);
    throw new Error((error as Error).message);
  }
}

export async function searchProduct(filters: string[], sort: string[], text?: string) {
  const apiRoot = user.createApiRoot(user.ctpClientFlow);
  try {
    const response = await apiRoot
      .productProjections()
      .search()
      .get({
        queryArgs: {
          fuzzy: true,
          filter: filters,
          'text.en': text,
          staged: true,
          //  limit: 10,
          sort,
        },
      })
      .execute();
    return response.body.results;
  } catch (error) {
    // alert(error);
    throw new Error((error as Error).message);
  }
}
