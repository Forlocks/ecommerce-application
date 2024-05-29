import React from 'react';
import './MainPage.scss';
import { Logo } from '../../components/visual/logo/Logo';
import { ProductList } from '../../components/visual/product/ProductList/ProductList';
import { IPage } from '../IPage';

export const MainPage: React.FC<IPage> = function () {
  return (
    <div className="main_page">
      <div className="hero-section">
        <div className="hero-title">
          <Logo className="logo-main" />
          <h1>
            Elegance
            <br />& Comfort
          </h1>
          <span>
            Explore a world of elegance and artistry with our exclusive collection of designer
            vases. Enhance your space with our unique, handcrafted pieces that tell a story of style
            and sophistication.
          </span>
          <div className="hero-art">
            <img src="./assets/images/art.svg" alt="art image" />
          </div>
        </div>
        <div className="hero-main-image">
          <img src="./assets/images/mainPage_big.webp" alt="Big image" />
        </div>
        <div className="hero-small-image">
          <img src="./assets/images/mainPage_small.webp" alt="Small image" />
        </div>
      </div>
      <div className="new-arrivals"></div>
      <ProductList />
    </div>
  );
};
