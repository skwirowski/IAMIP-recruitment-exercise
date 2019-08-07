import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import '../../globalStyles/resets.css';
import './styles/styles.css';

const FavouriteFilterBox = ({ onDisplayFavouritesClick, displayOnlyFavourites }) => {
  const handleDisplayFavouritesClick = () => {
    onDisplayFavouritesClick();
  };

  return (
    <div
      className={[
        'favourite-filter-box-container',
        'global__primary-container',
      ].join(' ')}
    >
      <button
        className={[
          'reset-button-styles',
          'favourite-filter-box-container__button',
        ].join(' ')}
        type="button"
        onClick={handleDisplayFavouritesClick}
      >
        {displayOnlyFavourites ? (
          <Fragment>
            <div className="favourite-filter-box-container__button--heart" />
            <span
              className={[
                'favourite-filter-box-container__button--content',
                'favourite-filter-box-container__button--content-remove',
              ].join(' ')}
            >
              Display all posts
            </span>
          </Fragment>
        ) : (
          <Fragment>
            <div
              className={[
                'favourite-filter-box-container__button--heart',
                'favourite-filter-box-container__button--heart-add',
              ].join(' ')}
            />
            <span className="favourite-filter-box-container__button--content">
              Display only favourite posts
            </span>
          </Fragment>
        )}
      </button>
    </div>
  );
};

FavouriteFilterBox.propTypes = {
  onDisplayFavouritesClick: PropTypes.func.isRequired,
  displayOnlyFavourites: PropTypes.bool,
};

FavouriteFilterBox.defaultProps = {
  displayOnlyFavourites: false,
};

export default FavouriteFilterBox;
