import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Comment from '../Comment';
import LoaderSmall from '../LoaderSmall';
import FavouriteButton from '../FavouriteButton';
import '../../globalStyles/resets.css';
import './styles/styles.css';

const Post = ({
  onViewCommentsClick,
  comments,
  title,
  body,
  loading,
  isFavourite,
  onToggleFavouritePostClick,
}) => {
  const handleViewCommentsClick = id => onViewCommentsClick(id);
  const handleToggleFavouritePostClick = id => onToggleFavouritePostClick(id);

  return (
    <div className="post-container">
      <h2 className="post-container__title">{title}</h2>
      <p className="post-container__body">{body}</p>
      <span
        className={[
          'global__separator-line',
          'global__separator-line--small-margin-bottom',
        ].join(' ')}
      />

      <FavouriteButton
        favourite={isFavourite}
        onClick={handleToggleFavouritePostClick}
      />

      <span
        className={[
          'global__separator-line',
          'global__separator-line--small-margin-top',
        ].join(' ')}
      />
      <button
        className={[
          'reset-button-styles',
          'post-container__view-comments',
        ].join(' ')}
        type="button"
        onClick={handleViewCommentsClick}
        disabled={comments.length !== 0 || loading}
      >
        View comments
      </button>

      {loading ? (
        <div className="post-container__comments-loader">
          <LoaderSmall />
        </div>
      ) : (
        <Fragment>
          {comments.map(comment => (
            <Comment
              key={comment.id}
              email={comment.email}
              body={comment.body}
            />
          ))}
          {comments.length !== 0 && (
            <form>
              <input
                className="post-container__comment-input"
                type="text"
                placeholder="Type your comment..."
              />
              <button
                className={[
                  'reset-button-styles',
                  'post-container__comment-button',
                ].join(' ')}
                type="submit"
              >
                Send
              </button>
            </form>
          )}
        </Fragment>
      )}

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
  title: PropTypes.string,
  body: PropTypes.string,
  loading: PropTypes.bool,
  isFavourite: PropTypes.bool,
  onToggleFavouritePostClick: PropTypes.func.isRequired,
};

Post.defaultProps = {
  comments: [],
  title: '',
  body: '',
  loading: false,
  isFavourite: false,
};

export default Post;
