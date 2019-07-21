import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Comment from '../Comment';
import fetchComments from '../../actions/commentActions'
import '../../globalStyles/resets.css';
import './styles/styles.css';

class Post extends PureComponent {

  handleClick = () => {
    const { fetchComments, id } = this.props;
    fetchComments(id);
  }

  render() {
    const { title, body } = this.props;

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
          onClick={() => this.handleClick()}
        >
          View comments
        </button>
        <Comment />
      </div>
    );
  }
}

const mapStateToProps = state => ({ state: state.commentReducer });

const mapDispatchToProps = dispatch => ({
  fetchComments: id => dispatch(fetchComments(id)),
});

Post.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string,
};

Post.defaultProps = {
  title: '',
  body: '',
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
