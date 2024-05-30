import React, { useEffect, useState } from 'react';
import { ProductProjection } from '@commercetools/platform-sdk';
import { useParams } from 'react-router-dom';
import { ProductDetailsCard } from '../../components/visual/product/ProductDetailsCard/ProductDetailsCard';
import { getProductID } from '../../controllers/api/Products';

export const ProductDetailsPage: React.FC = () => {
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
    <div className="product-details-page">
      <ProductDetailsCard
        product={product}
        className="extended-product-card"
        onButtonClick={() => {
          // Implement the button click functionality here
          console.log('Button clicked!');
        }}
      />
    </div>
  );
};
