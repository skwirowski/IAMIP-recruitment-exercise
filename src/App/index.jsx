import React, { PureComponent } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ReactPaginate from "react-paginate";

import postActions from "../actions/postActions";
// import commentActions from "../actions/commentActions";
import { setNumberToArray } from "../utils/helperFunctions";
import getEmail from "../services/getEmailAPI";

import Loader from "../components/Loader";
import Post from "../components/Post";

import "./styles/styles.css";

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      resultsOffset: 0,
      resultsLimit: 10,
      favouritePostsIds: [],
      newCommentContent: {},
      newComments: []
    };

    // if (window.performance) {
    //   if (performance.navigation.type == 1) {
    //     alert("This page is reloaded");
    //   } else {
    //     alert("This page is not reloaded");
    //   }
    // }
  }

  componentDidMount() {
    const { fetchPosts } = this.props;
    const { resultsOffset, resultsLimit } = this.state;
    fetchPosts(resultsOffset, resultsLimit);
  }

  componentDidUpdate() {
    const { setFavouritePosts } = this.props;
    const { canSetFavouritePosts } = this.props.postReducer;
    const { favouritePostsIds } = this.state;

    if (canSetFavouritePosts) {
      setFavouritePosts(favouritePostsIds);
    }
  }

  handlePageClick = posts => {
    let selected = posts.selected;
    let offset = Math.ceil(selected * 10);
    const { fetchPosts } = this.props;

    this.setState({ resultsOffset: offset }, () => {
      const { resultsOffset, resultsLimit } = this.state;
      fetchPosts(resultsOffset, resultsLimit);
    });
  };

  handleCommentsClick = id => {
    const { fetchComments } = this.props;
    fetchComments(id);
  };

  handleCommentChange = (commentContent, id) => {
    this.setState({
      newCommentContent: {
        postId: id,
        commentContent
      }
    });
  };

  handleCommentSubmit = id => {
    const { newComments, newCommentContent } = this.state;
    getEmail().then(data => {
      this.setState(
        {
          newComments: [
            ...newComments,
            {
              body: newCommentContent.commentContent,
              email: data.results[0].email,
              id: Date.now(),
              name: "",
              postId: id
            }
          ],
          newCommentContent: {}
        },
        () => console.log(this.state)
      );
    });
  };

  onToggleFavouritePostClick = (id, payload) => {
    const { toggleFavouritePost } = this.props;
    const { favouritePostsIds } = this.state;
    toggleFavouritePost(id, payload);

    setNumberToArray(id, favouritePostsIds);
    this.setState({
      favouritePostsIds
    });
  };

  render() {
    const { posts, isLoading } = this.props.postReducer;
    const { newCommentContent } = this.state;
    // console.log("Post Reducer LOG: ", this.props.postReducer);
    // console.log("Comment Reducer LOG: ", this.props.commentReducer);
    return (
      <div className="app">
        {isLoading ? (
          <Loader />
        ) : (
          <div>
            {posts.map(post => (
              <Post
                key={post.id}
                loading={post.isLoading}
                title={post.title}
                body={post.body}
                onViewCommentsClick={() => this.handleCommentsClick(post.id)}
                comments={post.comments}
                isFavourite={post.isFavourite}
                post={post}
                onToggleFavouritePostClick={() =>
                  this.onToggleFavouritePostClick(post.id, !post.isFavourite)
                }
                newCommentContent={
                  newCommentContent.postId === post.id
                    ? newCommentContent.commentContent
                    : ""
                }
                onCommentChange={newCommentContent =>
                  this.handleCommentChange(newCommentContent, post.id)
                }
                onCommentSubmit={() => {
                  if (newCommentContent.postId === post.id && newCommentContent.commentContent) {
                    this.handleCommentSubmit(post.id)
                  }
                }}
              />
            ))}
          </div>
        )}
        <ReactPaginate
          previousLabel={"<<"}
          nextLabel={">>"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={10}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageClick}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = dispatch => ({
  fetchPosts: (start, limit) => dispatch(postActions.fetchPosts(start, limit)),
  fetchComments: id => dispatch(postActions.fetchComments(id)),
  toggleFavouritePost: (id, payload) => dispatch(postActions.toggleFavouritePost(id, payload)),
  setFavouritePosts: ids => dispatch(postActions.setFavouritePosts(ids)),
});

App.propTypes = {
  fetchPosts: PropTypes.func.isRequired,
  state: PropTypes.shape({
    isLoading: PropTypes.bool,
    posts: PropTypes.array,
    error: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.oneOf([null])
    ])
  }),
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      body: PropTypes.string,
      id: PropTypes.number,
      title: PropTypes.string,
      userId: PropTypes.number
    })
  )
};

App.defaultProps = {
  state: {},
  posts: []
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
