import React from 'react';
import { Logo } from '../../components/visual/logo/Logo';

export const ProfilePage: React.FC = function () {
  return (
    <div className="profile_page">
      <div className="profile_title">
        <Logo className="logo-main" />
        <h2>Profile</h2>
      </div>
    </div>
  );
};
