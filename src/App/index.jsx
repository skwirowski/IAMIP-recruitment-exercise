import React, { PureComponent } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ReactPaginate from "react-paginate";

import postActions from "../actions/postActions";
import commentActions from "../actions/commentActions";
import emailActions from "../actions/emailActions";
import getComments from "../services/getCommentsAPI";
import { sliceArrayPiece } from "../utils/helperFunctions";

import Loader from "../components/Loader";
import Post from "../components/Post";

import "./styles/styles.css";

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      page: [],
      resultsOffset: 0,
      resultsLimit: 10,
      newCommentContent: {},
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
    const { fetchPosts, fetchEmail } = this.props;

    fetchPosts();
    fetchEmail();
  }

  componentDidUpdate() {
    const { setPostsLoadedFlag } = this.props;
    const { posts, postsLoaded } = this.props.postReducer;
    const { resultsOffset, resultsLimit } = this.state;

    if (postsLoaded) {
      const newPage = sliceArrayPiece(posts, resultsOffset, resultsLimit);

      this.setState({ page: newPage });
      setPostsLoadedFlag(false);
    }
  }

  handlePageClick = posts => {
    const { setPostsLoadedFlag } = this.props;
    let selected = posts.selected;
    let offset = Math.ceil(selected * 10);

    this.setState({ resultsOffset: offset }, () => {
      setPostsLoadedFlag(true);
    });
  };

  handleCommentsClick = id => {
    const { addCommentsToPost, setPostsLoadedFlag } = this.props;
    const setCommentLoadingFlag = flag => {
      this.setState({
        ...this.state,
        page: this.state.page.map(post => (
          (id === post.id) ? ({
            ...post,
            commentsLoading: flag,
          }) : (
            post)
        ))
      });
    }

    setCommentLoadingFlag(true);

    getComments(id)
    .then(data => addCommentsToPost(id, data))
    .then(() => setPostsLoadedFlag(true))
    .then(() => setCommentLoadingFlag(false));
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
    const { newCommentContent } = this.state;
    const { addNewCommentToPost, setPostsLoadedFlag } = this.props;
    const { userEmail } = this.props.emailReducer;
    const newComment = {
      body: newCommentContent.commentContent,
      email: userEmail,
      id: Date.now(),
      name: "",
      postId: id
    };

    this.setState({ newCommentContent: {} });

    addNewCommentToPost(id, newComment);
    setPostsLoadedFlag(true);
  };

  onToggleFavouritePostClick = (id, payload) => {
    const { toggleFavouritePost, setPostsLoadedFlag } = this.props;

    toggleFavouritePost(id, payload);
    setPostsLoadedFlag(true);
  };

  render() {
    const { postsLoading } = this.props.postReducer;
    const { userEmailLoading } = this.props.emailReducer;
    const { page, newCommentContent, newComments } = this.state;
    console.log()
    return (
      <div className="app">
        {(postsLoading || userEmailLoading) ? (
          <Loader />
        ) : (
          <div>
            {page.map(post => (
              <Post
                key={post.id}
                post={post}
                isFavourite={post.isFavourite}
                commentsLoading={post.commentsLoading}
                comments={post.comments}
                onViewCommentsClick={() => this.handleCommentsClick(post.id)}
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
  fetchEmail: () => dispatch(emailActions.fetchEmail()),
  setPostsLoadedFlag: flag => dispatch(postActions.setPostsLoadedFlag(flag)),
  addCommentsToPost: (id, payload) => dispatch(commentActions.addCommentsToPost(id, payload)),
  toggleFavouritePost: (id, payload) => dispatch(postActions.toggleFavouritePost(id, payload)),
  addNewCommentToPost: (id, payload) => dispatch(commentActions.addNewCommentToPost(id, payload)),
});

App.propTypes = {
  fetchPosts: PropTypes.func.isRequired,
  state: PropTypes.shape({
    postsLoading: PropTypes.bool,
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
