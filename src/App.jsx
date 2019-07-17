import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import postActions from './actions/postActions';
import Post from './components/Post';
import './globalStyles/styles.css';


class App extends PureComponent {
  state = {
    startPage: 0,
    endPage: 5,
    offset: 0,
  }

  componentDidMount() {
    const { fetchPosts } = this.props;
    fetchPosts(this.state.startPage, this.state.endPage);
  }

  handleClick = () => {
    const { fetchPosts } = this.props;
    this.setState({
      startPage: this.state.startPage + 5,
      endPage: this.state.endPage + 5,
    }, () => {
      fetchPosts(this.state.startPage, this.state.endPage);
    });
  }

  render() {
    const { posts } = this.props.state.postReducer;
    console.log(this.props.state.postReducer);
    return (
      <div className="App">
        <div>
          {posts ? (posts.map(post => (
            <Post
              key={post.id}
              title={post.title}
              body={post.body}
            />
          ))) : (
            <div>Loading ...</div>
          )}
        </div>
        <button type="button" onClick={() => this.handleClick()}>click</button>
      </div>
    );
  }
}

const mapStateToProps = state => ({ state });

const mapDispatchToProps = dispatch => ({
  fetchPosts: (start, end) => dispatch(postActions.fetchPosts(start, end)),
});

App.propTypes = {
  fetchPosts: PropTypes.func.isRequired,
  state: PropTypes.shape({
    isLoading: PropTypes.bool,
    posts: PropTypes.array,
    error: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.oneOf([null]),
    ]),
  }),
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      body: PropTypes.string,
      id: PropTypes.number,
      title: PropTypes.string,
      userId: PropTypes.number,
    }),
  ),
};

App.defaultProps = {
  state: {},
  posts: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
