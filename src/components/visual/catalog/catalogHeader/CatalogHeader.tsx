import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { LargeButton } from '../../buttons/LargeButton/LargeButton';
import './CatalogHeader.scss';

export const CatalogHeader: React.FC = () => {
  const location = useLocation().pathname;
  const navigate = useNavigate();

  return (
    <div className="catalog__header">
      <div className="header__breadcrumb">
        {location.includes('shop') ? (
          <LargeButton
            onClick={() => {
              navigate('/shop');
            }}
          >
            Shop
          </LargeButton>
        ) : null}
        {location.includes('vases') ? (
          <LargeButton
            onClick={() => {
              navigate('/shop/vases');
            }}
          >
            Vases
          </LargeButton>
        ) : null}
        {location.includes('decorations') ? (
          <LargeButton
            onClick={() => {
              navigate('/shop/decorations');
            }}
          >
            Decorations
          </LargeButton>
        ) : null}
      </div>
      <div className="header__categories">
        <NavLink to="/shop" className={({ isActive }) => (isActive ? 'category_active' : '')} end>
          All products
        </NavLink>
        <NavLink to="/shop/vases" className={({ isActive }) => (isActive ? 'category_active' : '')}>
          Vases
        </NavLink>
        <NavLink
          to="/shop/decorations"
          className={({ isActive }) => (isActive ? 'category_active' : '')}
        >
          Decorations
        </NavLink>
      </div>
    </div>
  );
};
