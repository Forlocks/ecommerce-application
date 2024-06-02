import React from 'react';
import { NavLink } from 'react-router-dom';

export const CatalogHeader: React.FC = () => (
  <div className="catalog-header">
    <NavLink to="/shop">All products</NavLink>
    <NavLink to="/shop/vases">Vases</NavLink>
    <NavLink to="/shop/decorations">Decorations</NavLink>
  </div>
);
