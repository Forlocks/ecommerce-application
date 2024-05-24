import React, { useEffect, useState } from 'react';
import '../product.scss';
import { ProductProjection } from '@commercetools/platform-sdk';
import { getProducts } from '../../../../controllers/api/Products';

export const ProductList: React.FC = () => {
  const [products, setProducts] = useState<ProductProjection[]>([]);
  useEffect(() => {
    async function fetchProducts() {
      try {
        const productArr = await getProducts();
        setProducts(productArr);
        console.log(productArr);
      } catch (error) {
        console.error('Error:', (error as Error).message);
      }
    }

    fetchProducts();
  }, []);

  const productList = products.map((product) => (
    <div key={product.id} className="product-list__item">
      <p>{product.name['en-US']}</p>
      {product.masterVariant && product.masterVariant.images && product.masterVariant.images[0] && (
        <img
          src={product.masterVariant.images[0].url}
          alt="Product Image"
          height="200"
          width="200"
        />
      )}
      {product.description && <p>{product.description['en-US']}</p>}
      {product.masterVariant && product.masterVariant.prices && product.masterVariant.prices[0] && (
        <div className="price">
          <div className={`price ${product.masterVariant.prices[0].discounted ? 'price_old' : ''}`}>
            <p>{product.masterVariant.prices[0].value.currencyCode === 'USD' && '$'}</p>
            <p>{product.masterVariant.prices[0].value.centAmount / 100}</p>
          </div>
          {product.masterVariant.prices[0].discounted && (
            <p className="discount">
              -
              {100 -
                (product.masterVariant.prices[0].discounted.value.centAmount * 100) /
                  product.masterVariant.prices[0].value.centAmount}
              %
            </p>
          )}
        </div>
      )}
      {product.masterVariant &&
        product.masterVariant.prices &&
        product.masterVariant.prices[0] &&
        product.masterVariant.prices[0].discounted &&
        product.masterVariant.prices[0].discounted.value &&
        product.masterVariant.prices[0].discounted.value.centAmount && (
          <div className="price_discount">
            <p>{product.masterVariant.prices[0].discounted.value.currencyCode === 'USD' && '$'}</p>
            <p>{product.masterVariant.prices[0].discounted.value.centAmount / 100}</p>
          </div>
        )}
    </div>
  ));

  return <div>{productList}</div>;
};
