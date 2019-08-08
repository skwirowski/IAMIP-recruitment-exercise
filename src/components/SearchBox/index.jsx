import React from 'react';
import PropTypes from 'prop-types';
import './styles/styles.css';

const SearchBox = ({ onSearchChange, searchPhraseContent, onCheckboxChange }) => {
  const handleSearchInputChange = (event) => {
    onSearchChange(event.target.value);
  };

  const handleCheckboxChange = (event) => {
    const chceckboxValue = event.target.value;
    const checkboxStatus = event.target.checked;
    onCheckboxChange(chceckboxValue, checkboxStatus);
  };

  const searchFields = ['title', 'body', 'name'];

  return (
    <div
      className={[
        'searchbox-container',
        'global__primary-container',
      ].join(' ')}
    >
      <input
        className="searchbox-container__search-input"
        type="text"
        onChange={handleSearchInputChange}
        value={searchPhraseContent}
        placeholder="Search here"
      />
      <div className="search-checkbox-container">
        {searchFields.map(item => (
          <label
            key={`${item}-key`}
            htmlFor={`${item}-checkbox`}
            className="search-checkbox-container__label"
          >
            <input
              id={`${item}-checkbox`}
              type="checkbox"
              onChange={handleCheckboxChange}
              value={item}
            />
            Search in
            <span>{item}</span>
            field.
          </label>
        ))}
      </div>
    </div>
  );
};

SearchBox.propTypes = {
  onSearchChange: PropTypes.func.isRequired,
  searchPhraseContent: PropTypes.string,
  onCheckboxChange: PropTypes.func.isRequired,
};

SearchBox.defaultProps = {
  searchPhraseContent: '',
};

export default SearchBox;
