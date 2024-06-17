import React, { useEffect, useRef, useState } from 'react';
import '../../components/visual/product/product.scss';
import { ProductProjection } from '@commercetools/platform-sdk';
import { ProductCard } from '../../components/visual/product/ProductCard/ProductCard';
import { searchProduct } from '../../controllers/api/Products';
import { IShopPages } from './IShopPages';
import { cartAddLineItem, getCart } from '../../controllers/api/Cart';
import { SmallButton } from '../../components/visual/buttons/SmallButton/SmallButton';

export const VasesPage: React.FC<IShopPages> = ({
  selectedColors,
  selectedStyle,
  selectedMaterials,
  minPrice,
  maxPrice,
  sortByPrice,
  sortByName,
  search,
}) => {
  const [filteredProducts, setFilteredProducts] = useState<ProductProjection[]>([]);
  const [availableProducts, setAvailableProducts] = useState<ProductProjection[]>([]);
  const [visibleProductsCount, setVisibleProductsCount] = useState<number>(8);
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

      queryArr.push('categories.id:"a57bf8df-df80-4b8c-81c1-2b7c5a8ff5f0"');

      const initialProducts = await searchProduct(queryArr, sortOrderArr, searchString);
      setAvailableProducts(initialProducts);
      setFilteredProducts(initialProducts);
    }

    fetchInitialProducts();
  }, []);

  function loadMore() {
    const newVisibleProductsCount = visibleProductsCount + 8;
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
                cartAddLineItem(product.id);
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
