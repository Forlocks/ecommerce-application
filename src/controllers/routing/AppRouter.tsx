import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { ErrorPage } from '../../pages/ErrorPage/ErrorPage';
import { MainPage } from '../../pages/MainPage/MainPage';
import { RegistrationPage } from '../../pages/RegistrationPage/RegistrationPage';
import { LoginPage } from '../../pages/LoginPage/LoginPage';
import { Layout } from '../../components/visual/layout/Layout';
import { ProtectedRoute } from './ProtectedRoute/ProtectedRoute';
import { CatalogLayout } from '../../components/visual/catalog/catalogLayout/CatalogLayout';
import { ProductsPage } from '../../pages/ShopPages/ProductsPage';
import { VasesPage } from '../../pages/ShopPages/VasesPage';
import { DecorationsPage } from '../../pages/ShopPages/DecorationsPage';
import { ProfilePage } from '../../pages/ProfilePage/ProfilePage';
import { ProductDetailsPage } from '../../pages/ProductDetailsPage/ProductDetailsPage';
import { CartPage } from '../../pages/CartPage/CartPage';

export const AppRouter = () => {
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedStyle, setSelectedStyle] = useState<string>('');
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [sortByPrice, setSortByPrice] = useState<string>('');
  const [sortByName, setSortByName] = useState<string>('');
  const [search, setSearch] = useState('');

  const handleFilterChange = (
    colors: string[],
    style: string,
    materials: string[],
    newMinPrice: number | null,
    newMaxPrice: number | null,
    newSortByPrice: string,
    newSortByName: string,
    newSearch: string,
  ) => {
    setSelectedColors(colors);
    setSelectedStyle(style);
    setSelectedMaterials(materials);
    setMinPrice(newMinPrice);
    setMaxPrice(newMaxPrice);
    setSortByPrice(newSortByPrice);
    setSortByName(newSortByName);
    setSearch(newSearch);
  };

  const [modalContent, setModalContent] = React.useState<React.ReactNode>(null);
  const [showModal, setShowModal] = React.useState(false);

  const openModal = (content: React.ReactNode) => {
    setModalContent(content);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout closeModal={closeModal} showModal={showModal} modalContent={modalContent} />
          }
        >
          <Route index element={<MainPage openModal={openModal} />} />
          <Route
            path="registration"
            element={
              <ProtectedRoute openModal={openModal}>
                <RegistrationPage openModal={openModal} />
              </ProtectedRoute>
            }
          />
          <Route
            path="login"
            element={
              <ProtectedRoute openModal={openModal}>
                <LoginPage openModal={openModal} />
              </ProtectedRoute>
            }
          />
          <Route
            path="profile"
            element={
              <ProtectedRoute openModal={openModal}>
                <ProfilePage openModal={openModal} />
              </ProtectedRoute>
            }
          />
          <Route path="product/:id" element={<ProductDetailsPage openModal={openModal} />} />
          <Route
            path="shop/"
            element={<CatalogLayout onFilterChange={handleFilterChange} openModal={openModal} />}
          >
            <Route
              index
              element={
                <ProductsPage
                  selectedColors={selectedColors}
                  selectedStyle={selectedStyle}
                  selectedMaterials={selectedMaterials}
                  minPrice={minPrice}
                  maxPrice={maxPrice}
                  sortByPrice={sortByPrice}
                  sortByName={sortByName}
                  search={search}
                />
              }
            />
            <Route
              path="vases"
              element={
                <VasesPage
                  selectedColors={selectedColors}
                  selectedStyle={selectedStyle}
                  selectedMaterials={selectedMaterials}
                  minPrice={minPrice}
                  maxPrice={maxPrice}
                  sortByPrice={sortByPrice}
                  sortByName={sortByName}
                  search={search}
                />
              }
            />
            <Route
              path="decorations"
              element={
                <DecorationsPage
                  selectedColors={selectedColors}
                  selectedStyle={selectedStyle}
                  selectedMaterials={selectedMaterials}
                  minPrice={minPrice}
                  maxPrice={maxPrice}
                  sortByPrice={sortByPrice}
                  sortByName={sortByName}
                  search={search}
                />
              }
            />
          </Route>
          <Route path="cart" element={<CartPage openModal={openModal} />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};
