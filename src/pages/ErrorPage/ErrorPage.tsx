import * as React from 'react';
import { Link } from 'react-router-dom';
import './ErrorPage.scss';

export const ErrorPage: React.FC = function () {
  return (
    <div className="error-page">
      <h1 className="error-page__title">
        404
        <br />
        Page not found
      </h1>
      <Link className="error-page__link" to="/">
        Back to the main page?
      </Link>
      <img
        className="error-page__image"
        src="../../assets/images/brokenVase.png"
        alt="Broken vase"
      />
    </div>
  );
};
