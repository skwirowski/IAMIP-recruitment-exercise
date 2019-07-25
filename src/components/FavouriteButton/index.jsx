import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import './styles/styles.css';

const FavouriteButton = ({ favourite, onClick }) => (
  <button
    className={[
      'reset-button-styles',
      'favourite-button',
    ].join(' ')}
    type="button"
    onClick={onClick}
  >
    <div className="favourite-button__wrapper">
      { favourite ? (
        <Fragment>
          <div className="favourite-button__heart" />
          <span
            className={[
              'favourite-button__content',
              'favourite-button__content--remove',
            ].join(' ')}
          >
              Remove from favourites
          </span>
        </Fragment>
      ) : (
        <Fragment>
          <div
            className={[
              'favourite-button__heart',
              'favourite-button__heart--add',
            ].join(' ')}
          />
          <span className="favourite-button__content">
            Add to favourites
          </span>
        </Fragment>
      )}

    </div>
  </button>
);

FavouriteButton.propTypes = {
  favourite: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

FavouriteButton.defaultProps = {
  favourite: false,
};

export default FavouriteButton;
