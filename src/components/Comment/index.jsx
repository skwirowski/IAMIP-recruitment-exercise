import React from 'react';
import PropTypes from 'prop-types';

import './styles/styles.css';

const Comment = ({ email, body }) => (
  <div className="comment-container">
    <div className="comment-wrapper">
      <p className="comment-wrapper__content">
        <span>{ email }</span>
        { body }
      </p>
    </div>
  </div>
);

Comment.propTypes = {
  email: PropTypes.string,
  body: PropTypes.string,
};

Comment.defaultProps = {
  email: '',
  body: '',
};

export default Comment;
