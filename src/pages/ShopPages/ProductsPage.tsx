import React, { useEffect, useRef, useState } from 'react';
import '../../components/visual/product/product.scss';
import { ProductProjection } from '@commercetools/platform-sdk';
import { ProductCard } from '../../components/visual/product/ProductCard/ProductCard';
import { searchProduct } from '../../controllers/api/Products';
import { IShopPages } from './IShopPages';
import { cartAddLineItem, getCart } from '../../controllers/api/Cart';
import { SmallButton } from '../../components/visual/buttons/SmallButton/SmallButton';

export const ProductsPage: React.FC<IShopPages> = ({
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
      cartProducts.forEach((product) => {
        cartProductsIds.push(product.productId);
      });
      setCartProductList(cartProductsIds);
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

      setFilteredProducts(sortedProducts);
    };

    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
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
  ]);

  useEffect(() => {
    async function fetchInitialProducts() {
      const queryArr: string[] = [];
      const sortOrderArr: string[] = [];
      const searchString = '';

      queryArr.push('categories.id:"9aa3a7ae-8e1b-4748-a9fd-2ec56ed7db5b"');

      const initialProducts = await searchProduct(queryArr, sortOrderArr, searchString);
      setFilteredProducts(initialProducts);
    }

    fetchInitialProducts();
  }, []);

  function loadMore() {
    const newVisibleProductsCount = visibleProductsCount + downloadableProductsCount;
    setVisibleProductsCount(newVisibleProductsCount);
  }

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
                console.log(`Button click on shop card ${product.id}`);
                cartAddLineItem(product.id);
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
