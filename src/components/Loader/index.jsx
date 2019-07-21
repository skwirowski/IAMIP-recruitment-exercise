import React from 'react';

import './styles/styles.css';

const Loader = () => (
  <div className="loader-container">
    <div className="lds-ring">
      <div />
      <div />
      <div />
      <div />
    </div>
  </div>
);

export default Loader;
