import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';
import PropTypes from 'prop-types';

import postActions from './actions/postActions';
import Post from './components/Post';


class App extends PureComponent {
  state = {
    startPage: 0,
    endPage: 5,
  }

  componentDidMount() {
    const { fetchPosts } = this.props;
    fetchPosts(this.state.startPage, this.state.endPage);
  }

  handlePageClick = (data) => {
    let selected = data.selected;
    let offset = Math.ceil(selected * this.props.perPage);

    this.setState({ offset }, () => {
      this.loadCommentsFromServer();
    });
  };


  render() {
    const posts = this.props.state.postReducer.posts;
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
          previousLabel="previous"
          nextLabel="next"
          breakLabel="..."
          breakClassName="break-me"
          pageCount={this.props.state.postReducer.posts.lenght}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageClick}
          containerClassName="pagination"
          subContainerClassName="pages pagination"
          activeClassName="active"
        />
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
