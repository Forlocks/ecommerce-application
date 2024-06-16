import React, { useEffect, useRef, useState } from 'react';
import '../../components/visual/product/product.scss';
import { ProductProjection } from '@commercetools/platform-sdk';
import { ProductCard } from '../../components/visual/product/ProductCard/ProductCard';
import { searchProduct } from '../../controllers/api/Products';
import { IShopPages } from './IShopPages';
import { cartAddLineItem, getCart } from '../../controllers/api/Cart';

export const ProductsPage: React.FC<IShopPages> = ({
  updateCartItemsQuantity,
  selectedColors,
  selectedStyle,
  selectedMaterials,
  minPrice,
  maxPrice,
  sortByPrice,
  sortByName,
  search,
}) => {
  const [products, setProducts] = useState<ProductProjection[]>([]);
  const [availableProducts, setAvailableProducts] = useState<ProductProjection[]>([]);
  const [cartProductList, setCartProductList] = useState<string[]>([]);
  const isInitialMount = useRef(true);

  // ---
  const getCartProducts = async () => {
    const carts = await getCart();
    if (carts.length) {
      const cartProducts = carts[carts.length - 1].lineItems;
      const cartProductsIds: string[] = [];
      let totalQuantity = 0;

      cartProducts.forEach((product) => {
        cartProductsIds.push(product.productId);
        totalQuantity += product.quantity;
      });

      setCartProductList(cartProductsIds);
      updateCartItemsQuantity(totalQuantity); // Обновление общего количества товаров
    }
  };

  useEffect(() => {
    getCartProducts();
  }, []);
  // ---

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      const colorStr =
        selectedColors.length !== 0
          ? selectedColors.map((color: string) => `"${color}"`)
          : ['exists'];
      const materialStr = selectedMaterials.map((material: string) => `"${material}"`);

      const queryArr = [`variants.attributes.attribute-colour-03:${[...colorStr]}`];
      if (selectedStyle !== '') {
        queryArr.push(`variants.attributes.attribute-style-01:"${selectedStyle}"`);
      }
      if (selectedMaterials.length !== 0) {
        queryArr.push(`variants.attributes.attribute-material-02:${[...materialStr]}`);
      }

      const minPriceValue =
        typeof minPrice === 'number' && !Number.isNaN(minPrice) ? minPrice * 100 : null;
      const maxPriceValue =
        typeof maxPrice === 'number' && !Number.isNaN(maxPrice) ? maxPrice * 100 : null;

      if (minPriceValue !== null || maxPriceValue !== null) {
        const minPricePlaceholder = minPriceValue !== null ? minPriceValue : '*';
        const maxPricePlaceholder = maxPriceValue !== null ? maxPriceValue : '*';
        const priceFilter = `variants.price.centAmount:range (${minPricePlaceholder} to ${maxPricePlaceholder})`;
        console.log(priceFilter);
        queryArr.push(priceFilter);
      }

      const sortOrderArr = [];

      if (sortByPrice) {
        const sortOrderPrice = sortByPrice === 'Min price' ? 'price asc' : 'price desc';
        sortOrderArr.push(sortOrderPrice);
      } else if (sortByName) {
        const sortOrderName = sortByName === 'A-Z' ? 'name.EN-US asc' : 'name.EN-US desc';
        sortOrderArr.push(sortOrderName);
      }

      const searchString = search;

      const sortedProducts = await searchProduct(queryArr, sortOrderArr, searchString);

      const result = sortedProducts.filter((element) => {
        return availableProducts.some((product) => product.id === element.id);
      });

      setProducts(result);
    };

    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else if (availableProducts.length > 0) {
      fetchFilteredProducts();
    }
  }, [
    selectedColors,
    selectedStyle,
    selectedMaterials,
    minPrice,
    maxPrice,
    sortByPrice,
    sortByName,
    search,
    availableProducts,
  ]);

  useEffect(() => {
    async function fetchInitialProducts() {
      const queryArr: string[] = [];
      const sortOrderArr: string[] = [];
      const searchString = '';

      queryArr.push('categories.id:"9aa3a7ae-8e1b-4748-a9fd-2ec56ed7db5b"');

      const initialProducts = await searchProduct(queryArr, sortOrderArr, searchString);
      setAvailableProducts(initialProducts);
      setProducts(initialProducts);
    }

    fetchInitialProducts();
  }, []);

  const handleAddToCart = async (productId: string) => {
    try {
      const updatedCart = await cartAddLineItem(productId);
      await getCartProducts();
      updateCartItemsQuantity(updatedCart.lineItems.length);
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };

  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductCard
          className="shop"
          key={product.id}
          product={product}
          onButtonClick={() => {
            console.log(`Button click on shop card ${product.id}`);
            handleAddToCart(product.id);
          }}
          cartProductList={cartProductList}
        />
      ))}
    </div>
  );
};
