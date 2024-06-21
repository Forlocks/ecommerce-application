import { getProducts, getProductID, searchProduct } from '../Products';
import { user } from '../../..';

jest.mock('../../..', () => ({
  user: {
    createApiRoot: jest.fn(),
    ctpClientFlow: jest.fn(),
  },
}));

describe('Products', () => {
  const mockExecute = jest.fn();
  const mockApiRoot = {
    productProjections: jest.fn().mockReturnThis(),
    get: jest.fn().mockReturnThis(),
    withId: jest.fn().mockReturnThis(),
    search: jest.fn().mockReturnThis(),
    execute: mockExecute,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (user.createApiRoot as jest.Mock).mockReturnValue(mockApiRoot);
  });

  describe('getProducts', () => {
    it('return products', async () => {
      const mockResults = [
        { id: '1', name: 'Product 1' },
        { id: '2', name: 'Product 2' },
      ];
      mockExecute.mockResolvedValueOnce({ body: { results: mockResults } });

      const products = await getProducts();
      expect(products).toEqual(mockResults);
      expect(user.createApiRoot).toHaveBeenCalledWith(user.ctpClientFlow);
      expect(mockApiRoot.productProjections().get().execute).toHaveBeenCalled();
    });

    it('should throw an error when the request fails', async () => {
      const mockError = new Error('Network Error');
      mockExecute.mockRejectedValueOnce(mockError);

      await expect(getProducts()).rejects.toThrow('Network Error');
    });
  });

  describe('getProductID', () => {
    it('return product by ID', async () => {
      const mockProduct = { id: '1', name: 'Product 1' };
      mockExecute.mockResolvedValueOnce({ body: mockProduct });

      const product = await getProductID('1');
      expect(product).toEqual(mockProduct);
      expect(user.createApiRoot).toHaveBeenCalledWith(user.ctpClientFlow);
      expect(mockApiRoot.productProjections().withId({ ID: '1' }).get().execute).toHaveBeenCalled();
    });

    it('should throw an error when the request fails', async () => {
      const mockError = new Error('Network Error');
      mockExecute.mockRejectedValueOnce(mockError);

      await expect(getProductID('1')).rejects.toThrow('Network Error');
    });
  });

  describe('searchProduct', () => {
    it('return searched products', async () => {
      const mockResults = [
        { id: '1', name: 'Product 1' },
        { id: '2', name: 'Product 2' },
      ];
      const filters = ['filter1', 'filter2'];
      const sort = ['sort1', 'sort2'];
      const text = 'search text';
      mockExecute.mockResolvedValueOnce({ body: { results: mockResults } });

      const products = await searchProduct(filters, sort, text);
      expect(products).toEqual(mockResults);
      expect(user.createApiRoot).toHaveBeenCalledWith(user.ctpClientFlow);
      expect(
        mockApiRoot
          .productProjections()
          .search()
          .get({
            queryArgs: {
              fuzzy: true,
              filter: filters,
              'text.EN-US': text,
              staged: true,
              sort,
            },
          }).execute,
      ).toHaveBeenCalled();
    });

    it('throw an error when the request fails', async () => {
      const mockError = new Error('Network Error');
      mockExecute.mockRejectedValueOnce(mockError);

      await expect(searchProduct(['filter1'], ['sort1'], 'text')).rejects.toThrow('Network Error');
    });
  });
});
