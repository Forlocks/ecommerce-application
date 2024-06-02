import React, { useEffect, useState } from 'react';
import '../product.scss';
import { ProductProjection } from '@commercetools/platform-sdk';
import { searchProduct } from '../../../../controllers/api/Products';
import { ProductCard } from '../ProductCard/ProductCard';
import { IProductList } from './IProductList';

export const ProductList: React.FC<IProductList> = ({
  selectedColors,
  selectedStyle,
  selectedMaterials,
  minPrice,
  maxPrice,
  sortByPrice,
  sortByName,
}) => {
  const [products, setProducts] = useState<ProductProjection[]>([]);

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
        const sortOrder = sortByPrice === 'Min price' ? 'price asc' : 'price desc';
        sortOrderArr.push(sortOrder);
      }

      const result = await searchProduct(queryArr, sortOrderArr);
      // const result = await searchProduct([], '"VAS-Whispering Pines-003-A');
      setProducts(result);
    };

    fetchFilteredProducts();
  }, [
    selectedColors,
    selectedStyle,
    selectedMaterials,
    minPrice,
    maxPrice,
    sortByPrice,
    sortByName,
  ]);

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
