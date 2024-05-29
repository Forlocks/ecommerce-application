import React from 'react';
import { Logo } from '../../components/visual/logo/Logo';
import { IPage } from '../IPage';

export const ProfilePage: React.FC<IPage> = function () {
  return (
    <div className="profile_page">
      <div className="profile_title">
        <Logo className="logo-main" />
        <h2>Profile</h2>
      </div>
    </div>
  );
};
