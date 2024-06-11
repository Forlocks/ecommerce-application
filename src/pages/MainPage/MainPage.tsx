import React from 'react';
import './MainPage.scss';
import { Logo } from '../../components/visual/logo/Logo';
import { IPage } from '../IPage';
import { LargeButton } from '../../components/visual/buttons/LargeButton/LargeButton';

const applyTenProsentDiscountCode = () => {
  console.log('Discount applied 10 to all');
  // Здесь будет логика для применения скидочного кода
};

const apply35ProsentDiscountCode = () => {
  console.log('Discount applied 35 to decor');
  // Здесь будет логика для применения скидочного кода
};

export const MainPage: React.FC<IPage> = function () {
  return (
    <div className="main_page">
      <div className="hero-section">
        <div className="hero-title">
          <Logo className="logo-main" />
          <h1>
            Decor
            <br />& Vases
          </h1>
          <span>
            Explore a world of elegance and artistry with our exclusive collection of designer
            dexorations vases. Enhance your space with our unique, handcrafted pieces that tell a
            story of style and sophistication.
          </span>
          <div className="hero-art">
            <img src="./assets/images/art.svg" alt="art image" />
          </div>
        </div>
        <div className="hero-main-image">
          <img src="./assets/images/mainPage_big_3.webp" alt="Big image" />
        </div>
      </div>
      <div className="discount-first">
        <div className="discount-first-big-image">
          <img src="./assets/images/mainPage_discount_1.webp" alt="discount first big" />
        </div>
        <div className="discount-first-small-image">
          <img src="./assets/images/mainPage_discount_1-2.webp" alt="discount first smal" />
        </div>
        <div className="discount-first-info">
          <h2>Get 10% off on all</h2>
          <span>
            Take advantage of our special offer and save on your next purchase! Use the code
            DISCOUNT10 at checkout to receive a 10% discount on your order. Don't miss out—apply
            your discount today and enjoy the value we've created just for you. Remember, a little
            saving can go a long way!
          </span>
          <h3>DISCOUNT10</h3>
          <LargeButton onClick={applyTenProsentDiscountCode}>use discount</LargeButton>
        </div>
      </div>
      <div className="discount-second">
        <div className="discount-second-info">
          <h2>Get 35% off on decorations</h2>
          <span>
            Unlock a 35% discount on all decor items in your cart with the promo code DECORATION35,
            available for a month. This one-time offer activates upon code application, bringing a
            touch of elegance to your space at an unbeatable price. Don't let this opportunity slip
            away—enhance your surroundings with our exquisite decor collection today!
          </span>
          <h3>DECORATION35</h3>
          <LargeButton onClick={apply35ProsentDiscountCode}>use discount</LargeButton>
        </div>
        <div className="discount-second-image">
          <img src="./assets/images/mainPage_discount_2.webp" alt="discount second image" />
        </div>
      </div>
    </div>
  );
};
