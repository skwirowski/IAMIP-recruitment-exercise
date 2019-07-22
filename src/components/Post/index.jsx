import React from 'react';
import PropTypes from 'prop-types';

import Comment from '../Comment';
import '../../globalStyles/resets.css';
import './styles/styles.css';

const Post = ({
  onViewCommentsClick, comments, name, title, body,
}) => {
  const handleClick = id => onViewCommentsClick(id);

  return (
    <div className="post-container">
      <h2 className="post-container__title">{title}</h2>
      <p className="post-container__body">{body}</p>
      <span className="global__separator-line" />
      <button
        className={[
          'reset-button-styles',
          'post-container__view-comments',
        ].join(' ')}
        type="button"
        onClick={handleClick}
      >
        View comments
      </button>
      {
          !comments ? (
            <div>Loading...</div>
          ) : (
            <div>
              {
                comments.map(comment => (
                  <Comment
                    key={comment.id}
                    title={comment.title}
                    body={comment.body}
                  />
                ))
              }
            </div>
          )
        }
    </div>
  );
};

Post.propTypes = {
  onViewCommentsClick: PropTypes.func.isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      body: PropTypes.string,
      email: PropTypes.string,
      id: PropTypes.number,
      name: PropTypes.string,
      postId: PropTypes.number,
    }),
  ),
  name: PropTypes.string,
  title: PropTypes.string,
  body: PropTypes.string,
};

Post.defaultProps = {
  comments: [],
  name: '',
  title: '',
  body: '',
};

export default Post;
