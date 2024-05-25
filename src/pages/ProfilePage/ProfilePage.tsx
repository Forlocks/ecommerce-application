import React from 'react';
import { Logo } from '../../components/visual/logo/Logo';
import './ProfilePage.scss';
import { ProfileForm } from '../../components/visual/forms/ProfileForm/ProfileForm';

export const ProfilePage: React.FC = function () {
  return (
    <div className="profile_page">
      <div className="profile_title">
        <Logo className="logo-main" />
        <h2>Profile</h2>
      </div>
      <div className="form_container">
        <ProfileForm />
      </div>
      <div className="image-small">
        <img src="./assets/images/ProfilePage_small.webp" alt="Small image" />
      </div>
    </div>
  );
};
