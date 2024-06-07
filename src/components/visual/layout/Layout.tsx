import React from 'react';
import { Outlet } from 'react-router-dom';
import { Modal } from '../modal/Modal';
import { Header } from '../header/Header';
import { LayoutProps } from './ILayout';

export const Layout: React.FC<LayoutProps> = ({ closeModal, showModal, modalContent }) => (
  <>
    <Modal isShow={showModal} onClose={closeModal}>
      {modalContent}
    </Modal>
    <Header />
    <Outlet />
  </>
);
