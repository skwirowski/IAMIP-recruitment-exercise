import React from 'react';
import PropTypes from 'prop-types';

import './styles/styles.css';

const Post = ({ title, body }) => (
  <div className="post-container">
    <h2 className="post-container__title">{ title }</h2>
    <p className="post-container__body">{ body }</p>
  </div>
);

Post.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string,
};

Post.defaultProps = {
  title: '',
  body: '',
};

export default Post;
