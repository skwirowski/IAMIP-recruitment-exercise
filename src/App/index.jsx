import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';

import postActions from '../actions/postActions';
import Post from '../components/Post';

import './styles/styles.css'


class App extends PureComponent {
  state = {
    startPage: 0,
    resultsLimit: 10,
  }

  componentDidMount() {
    const { fetchPosts } = this.props;
    fetchPosts(this.state.startPage, this.state.resultsLimit);
  }

  handlePageClick = posts => {
    let selected = posts.selected;
    let startPage = Math.ceil(selected * 10);
    const { fetchPosts } = this.props;

    this.setState({ startPage: startPage }, () => {
      fetchPosts(this.state.startPage, this.state.resultsLimit);
    });
  };

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
        <ReactPaginate
          previousLabel={'<<'}
          nextLabel={'>>'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={10}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageClick}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({ state });

const mapDispatchToProps = dispatch => ({
  fetchPosts: (start, limit) => dispatch(postActions.fetchPosts(start, limit)),
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
