import React, { useEffect, useState } from 'react';
import { ProductProjection } from '@commercetools/platform-sdk';
import { useParams } from 'react-router-dom';

import { ProductDetailsCard } from '../../components/visual/product/ProductDetailsCard/ProductDetailsCard';
import { getProductID } from '../../controllers/api/Products';
import './ProductDetailsPage.scss';

import { IPage } from '../IPage';
import { getCart } from '../../controllers/api/Cart';
import { CartProduct } from '../../components/visual/product/ProductCard/IProductCardProps';

export const ProductDetailsPage: React.FC<IPage> = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductProjection | null>(null);

  // ---

  const [cartProductList, setCartProductList] = useState<CartProduct[]>([]);
  const getCartProducts = async () => {
    const carts = await getCart();
    if (carts.length) {
      const cartProducts = carts[carts.length - 1].lineItems;
      const cartProductsIds = cartProducts.map((productCart) => ({
        id: productCart.productId,
        variant: productCart.variant.id,
        lineItemId: productCart.id,
      }));
      setCartProductList(cartProductsIds);
    }
  };

  useEffect(() => {
    getCartProducts();
  }, []);

  // ---

  useEffect(() => {
    async function fetchProduct() {
      try {
        if (id) {
          const fetchedProduct = await getProductID(id);
          setProduct(fetchedProduct);
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
        getCartProducts();
      }}
      cartProductList={cartProductList}
    />
  );
};
