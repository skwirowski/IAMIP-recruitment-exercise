import React from 'react';
import PropTypes from 'prop-types';

import '../../globalStyles/resets.css';
import './styles/styles.css';

const Post = ({ title, body }) => (
  <div className="post-container">
    <h2 className="post-container__title">{ title }</h2>
    <p className="post-container__body">{ body }</p>
    <span className="global__separator-line" />
    <button
      className={[
        'reset-button-styles',
        'post-container__view-comments',
      ].join(' ')}
      type="button"
      onClick={() => {}}
    >
      View comments
    </button>
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
