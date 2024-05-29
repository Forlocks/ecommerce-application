import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ErrorPage } from '../../pages/ErrorPage/ErrorPage';
import { MainPage } from '../../pages/MainPage/MainPage';
import { RegistrationPage } from '../../pages/RegistrationPage/RegistrationPage';
import { LoginPage } from '../../pages/LoginPage/LoginPage';
import { Layout } from '../../components/visual/layout/Layout';
import { ProtectedRoute } from './ProtectedRoute/ProtectedRoute';
import { ShopPage } from '../../pages/ShopPage/ShopPage';
import { ProfilePage } from '../../pages/ProfilePage/ProfilePage';
import { ProductDetailsPage } from '../../pages/ProductDetailsPage/ProductDetailsPage';

export const AppRouter = () => {
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
            <Layout
              closeModal={closeModal}
              showModal={showModal}
              modalContent={modalContent}
            />
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
            path="shop"
            element={
              <Layout>
                <ShopPage />
              </Layout>
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
          <Route
            path="product/:id"
            element={
              <Layout>
                <ProductDetailsPage />
              </Layout>
            }
          />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};
