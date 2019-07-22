import React from 'react';

import './styles/styles.css';

const Comment = ({ title, body }) => (
  <div className="comment-container">
    <p className="comment-container__content">
      <span>{ title }</span>
      { body }
    </p>
  </div>
);

export default Comment;
