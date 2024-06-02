import React, { useEffect, useState } from 'react';
import '../../components/visual/product/product.scss';
import { ProductProjection } from '@commercetools/platform-sdk';
import { getProducts } from '../../controllers/api/Products';
import { ProductCard } from '../../components/visual/product/ProductCard/ProductCard';

export const DecorationsPage: React.FC = () => {
  const [products, setProducts] = useState<ProductProjection[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const productArr = await getProducts();

        const sortedProducts: ProductProjection[] = [];

        productArr.forEach((item) => {
          if (item.masterVariant.sku?.slice(0, 3) === 'DEC') {
            sortedProducts.push(item);
          }
        });

        setProducts(sortedProducts);

        console.log(productArr);
      } catch (error) {
        console.error('Error:', (error as Error).message);
      }
    }

    fetchProducts();
  }, []);

  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductCard
          className="shop"
          key={product.id}
          product={product}
          onButtonClick={() => console.log(`Button click on shop card ${product.id}`)}
        />
      ))}
    </div>
  );
};
