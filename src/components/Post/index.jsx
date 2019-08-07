import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Comment from '../Comment';
import LoaderSmall from '../LoaderSmall';
import FavouriteButton from '../FavouriteButton';
import '../../globalStyles/resets.css';
import './styles/styles.css';
import sendIcon from '../../utils/images/send.svg';

const Post = ({
  post,
  isFavourite,
  commentsLoading,
  comments,
  onViewCommentsClick,
  onToggleFavouritePostClick,
  onCommentChange,
  newCommentContent,
  onCommentSubmit,
}) => {
  const handleViewCommentsClick = id => onViewCommentsClick(id);

  const handleChangeComment = (event, id) => {
    onCommentChange(event.target.value, id);
  };

  const handleCommentSubmit = (event, id) => {
    event.preventDefault();
    onCommentSubmit(id);
  };

  const handleToggleFavouritePostClick = id => onToggleFavouritePostClick(id);

  return (
    <div className="post-container global__primary-container">
      <h2 className="post-container__title">{post.title}</h2>
      <h3 className="post-container__name">
        Author:
        <span>{post.name}</span>
      </h3>
      <p className="post-container__body">{post.body}</p>
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
        disabled={comments.length !== 0 || commentsLoading}
      >
        View comments
      </button>

      {commentsLoading ? (
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
            <form
              className="post-container__comment-input-container"
              onSubmit={handleCommentSubmit}
            >
              <input
                className="post-container__comment-input"
                type="text"
                onChange={handleChangeComment}
                value={newCommentContent}
                placeholder="Type your comment..."
              />
              <button
                className={[
                  'reset-button-styles',
                  'post-container__comment-button',
                ].join(' ')}
                type="submit"
              >
                <img
                  className="post-container__comment-button--icon"
                  src={sendIcon}
                  alt="Send button icon"
                />
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
  post: PropTypes.shape({
    title: PropTypes.string,
    body: PropTypes.string,
    name: PropTypes.string,
  }),
  isFavourite: PropTypes.bool,
  commentsLoading: PropTypes.bool,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      body: PropTypes.string,
      email: PropTypes.string,
      id: PropTypes.number,
      name: PropTypes.string,
      postId: PropTypes.number,
    }),
  ),
  onViewCommentsClick: PropTypes.func.isRequired,
  onToggleFavouritePostClick: PropTypes.func.isRequired,
  onCommentChange: PropTypes.func.isRequired,
  newCommentContent: PropTypes.string,
  onCommentSubmit: PropTypes.func.isRequired,
};

Post.defaultProps = {
  post: {
    title: '',
    body: '',
    name: '',
  },
  isFavourite: false,
  commentsLoading: false,
  comments: [],
  newCommentContent: '',
};

export default Post;
