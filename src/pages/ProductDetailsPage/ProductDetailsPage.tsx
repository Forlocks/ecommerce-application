import React, { useEffect, useState } from 'react';
import { ProductProjection } from '@commercetools/platform-sdk';
import { useParams } from 'react-router-dom';

import { ProductDetailsCard } from '../../components/visual/product/ProductDetailsCard/ProductDetailsCard';
import { getProductID } from '../../controllers/api/Products';
import './ProductDetailsPage.scss';

import { IPage } from '../IPage';

export const ProductDetailsPage: React.FC<IPage> = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductProjection | null>(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        if (id) {
          const fetchedProduct = await getProductID(id);
          setProduct(fetchedProduct);
          console.log(fetchedProduct);
        }
      } catch (error) {
        console.error('Error:', (error as Error).message);
      }
    }

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <ProductDetailsCard
      product={product}
      className="product-details_page"
      onButtonClick={() => {
        console.log('Button clicked!');
      }}
    />
  );
};
