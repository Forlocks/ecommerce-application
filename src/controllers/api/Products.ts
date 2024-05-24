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
