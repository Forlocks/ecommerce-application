import React, { useEffect, useRef, useState } from 'react';
import '../../components/visual/product/product.scss';
import { ProductProjection } from '@commercetools/platform-sdk';
import { ProductCard } from '../../components/visual/product/ProductCard/ProductCard';
import { searchProduct } from '../../controllers/api/Products';
import { IShopPages } from './IShopPages';
import { cartAddLineItem, getCart } from '../../controllers/api/Cart';
import { SmallButton } from '../../components/visual/buttons/SmallButton/SmallButton';

export const DecorationsPage: React.FC<IShopPages> = ({
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
  const mq = window.matchMedia('(max-width: 1600px)');
  let downloadableProductsCount: number;

  if (mq.matches) {
    downloadableProductsCount = 10;
  } else {
    downloadableProductsCount = 8;
  }

  const [filteredProducts, setFilteredProducts] = useState<ProductProjection[]>([]);
  const [availableProducts, setAvailableProducts] = useState<ProductProjection[]>([]);
  const [visibleProductsCount, setVisibleProductsCount] =
    useState<number>(downloadableProductsCount);
  const [cartProductList, setCartProductList] = useState<string[]>([]);
  const isInitialMount = useRef(true);
  const loadArrow = (
    <img className="load-arrow" src="/assets/icons/load-arrow.svg" alt="load-arrow" />
  );

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
      updateCartItemsQuantity(totalQuantity);
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

      setFilteredProducts(result);
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

      queryArr.push('categories.id:"afca80a8-d65d-4a4b-92ab-af2ddef97df3"');

      const initialProducts = await searchProduct(queryArr, sortOrderArr, searchString);
      setAvailableProducts(initialProducts);
      setFilteredProducts(initialProducts);
    }

    fetchInitialProducts();
  }, []);

  function loadMore() {
    const newVisibleProductsCount = visibleProductsCount + downloadableProductsCount;
    setVisibleProductsCount(newVisibleProductsCount);
  }

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
    <>
      <div className="product-container">
        <div className="product-list">
          {filteredProducts.slice(0, visibleProductsCount).map((product) => (
            <ProductCard
              className="shop"
              key={product.id}
              product={product}
              onButtonClick={() => {
                handleAddToCart(product.id);
                console.log(`Button click on shop card ${product.id}`);
              }}
              cartProductList={cartProductList}
            />
          ))}
        </div>
      </div>
      {filteredProducts.length > visibleProductsCount && (
        <SmallButton onClick={loadMore} icon={loadArrow}></SmallButton>
      )}
    </>
  );
};
