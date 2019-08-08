import React from 'react';
import PropTypes from 'prop-types';
import '../../globalStyles/resets.css';
import './styles/styles.css';

import sortingIcon1 from '../../utils/images/sort-by-alphabet.svg';
import sortingIcon2 from '../../utils/images/sort-reverse-alphabetical-order.svg';
import sortingIcon3 from '../../utils/images/sort-by-numeric-order.svg';
import sortingIcon4 from '../../utils/images/sort-by-order.svg';

const SortBox = ({ onRadioChange }) => {
  const handleRadioChange = (event) => {
    const radioInputValue = event.target.value;
    const radioInputStatus = event.target.checked;
    onRadioChange(radioInputValue, radioInputStatus);
  };

  const sortingOrdersData = [
    {
      value: 'alphabetical-order',
      description: 'Sort posts by <span>title</span> in alphabetical order',
      image: sortingIcon1,
    }, {
      value: 'reverse-alphabetical-order',
      description: 'Sort posts by <span>title</span> in reverse alphabetical order',
      image: sortingIcon2,
    }, {
      value: 'ascending-order',
      description: 'Sort posts by <span>id</span> in ascending numerical order',
      image: sortingIcon3,
    }, {
      value: 'descending-order',
      description: 'Sort posts by <span>id</span> in descending numerical order',
      image: sortingIcon4,
    },
  ];

  return (
    <div
      className={[
        'sortbox-container',
        'global__primary-container',
      ].join(' ')}
    >
      {sortingOrdersData.map(item => (
        <label
          key={`${item.value}-key`}
          htmlFor={`${item.value}-radio`}
          className="sortbox-container__label"
        >
          <input
            id={`${item.value}-radio`}
            className="sortbox-container__label--input"
            type="radio"
            onChange={handleRadioChange}
            name="sorting-orders"
            value={item.value}
          />
          <span className="sortbox-container__label--checkmark">
            <img
              className="sortbox-container__label--checkmark-image"
              src={item.image}
              alt={`${item.description} icon`}
            />
          </span>
          <span
            dangerouslySetInnerHTML={{ __html: item.description }}
            className="sortbox-container__label--description"
          />
        </label>
      ))}
    </div>
  );
};

SortBox.propTypes = {
  onRadioChange: PropTypes.func.isRequired,
};

export default SortBox;
