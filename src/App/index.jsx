import React, { PureComponent } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ReactPaginate from "react-paginate";

import postActions from "../actions/postActions";
import commentActions from "../actions/commentActions";
import emailActions from "../actions/emailActions";
import getComments from "../services/getCommentsAPI";
import getNames from "../services/getNamesAPI";
import {
  sliceArrayPiece,
  capitalizeFirstLetter,
  calculatePagesNumber
} from "../utils/helperFunctions";

import Loader from "../components/Loader";
import SearchBox from "../components/SearchBox";
import FavouriteFilterBox from "../components/FavouriteFilterBox";
import SortBox from "../components/SortBox";
import Post from "../components/Post";

import "./styles/styles.css";

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      page: [],
      resultsOffset: 0,
      resultsLimit: 10,
      pageCount: 10,
      newCommentContent: {},
      authorsLoaded: false,
      searchPhrase: "",
      searchFields: {
        title: "",
        body: "",
        name: ""
      },
      displayOnlyFavourites: false,
    };
  }

  componentDidMount() {
    const { fetchPosts, fetchEmail } = this.props;

    fetchPosts();
    fetchEmail();
  }

  componentDidUpdate() {
    const { setPostsLoadedFlag, addNamesToPosts } = this.props;
    const { posts, postsLoaded } = this.props.postReducer;
    const {
      resultsOffset,
      resultsLimit,
      authorsLoaded,
      searchPhrase,
      displayOnlyFavourites,
    } = this.state;
    const { title, body, name } = this.state.searchFields;

    // SEARCH filtering -->
    const defineSearchFilters = (post, query) => {
      let titleField, bodyField, nameField;
      if (title) {
        titleField = post[title].toLowerCase().includes(query.toLowerCase());
      }
      if (body) {
        bodyField = post[body].toLowerCase().includes(query.toLowerCase());
      }
      if (name) {
        nameField = post[name].toLowerCase().includes(query.toLowerCase());
      }
      return titleField || bodyField || nameField;
    };
    let searchResultsPosts =
      !title && !body && !name
        ? posts
        : posts.filter(post => defineSearchFilters(post, searchPhrase));
    // <-- SEARCH filtering

    // ONLY FAVOURITES filtering -->
    let favouritePostsFilter =
      displayOnlyFavourites
        ? searchResultsPosts.filter(post => post.isFavourite)
        : searchResultsPosts;
    // <-- ONLY FAVOURITES filtering

    if (postsLoaded) {
      const newPage = sliceArrayPiece(
        favouritePostsFilter,
        resultsOffset,
        resultsLimit
      );
      this.setState({
        page: newPage,
        pageCount: calculatePagesNumber(favouritePostsFilter)
      });
      setPostsLoadedFlag(false);
    }

    if (postsLoaded && !authorsLoaded) {
      this.setState({ authorsLoaded: true });

      getNames()
        .then(data =>
          data.map(item => {
            const firstName = capitalizeFirstLetter(item.name.first);
            const lastName = capitalizeFirstLetter(item.name.last);
            return `${firstName} ${lastName}`;
          })
        )
        .then(name => addNamesToPosts(name))
        .then(() => {
          setPostsLoadedFlag(true);
        });
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
        page: this.state.page.map(post =>
          id === post.id
            ? {
                ...post,
                commentsLoading: flag
              }
            : post
        )
      });
    };

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

  handleFavouritePostClick = (id, payload) => {
    const { toggleFavouritePost, setPostsLoadedFlag } = this.props;

    toggleFavouritePost(id, payload);
    setPostsLoadedFlag(true);
  };

  handleSearchChange = searchPhraseContent => {
    const { setPostsLoadedFlag } = this.props;
    this.setState({ searchPhrase: searchPhraseContent });
    setPostsLoadedFlag(true);
  };

  handleCheckboxChange = (value, status) => {
    const checkboxValue = status ? value : "";
    this.setState({
      searchFields: {
        ...this.state.searchFields,
        [value]: checkboxValue
      }
    });
  };

  handleDisplayFavouritesClick = () => {
    const { setPostsLoadedFlag } = this.props;
    const { displayOnlyFavourites } = this.state;
    this.setState({ displayOnlyFavourites: !displayOnlyFavourites });
    setPostsLoadedFlag(true);
  }

  render() {
    const { postsLoading } = this.props.postReducer;
    const { userEmailLoading } = this.props.emailReducer;
    const { page, pageCount, newCommentContent, searchPhrase, displayOnlyFavourites } = this.state;

    return (
      <div className="app">
        <SearchBox
          onSearchChange={this.handleSearchChange}
          searchPhraseContent={searchPhrase}
          onCheckboxChange={this.handleCheckboxChange}
        />
        <FavouriteFilterBox
          onDisplayFavouritesClick={this.handleDisplayFavouritesClick}
          displayOnlyFavourites={displayOnlyFavourites}
        />
        <SortBox />
        {postsLoading || userEmailLoading ? (
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
                  this.handleFavouritePostClick(post.id, !post.isFavourite)
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
                  if (
                    newCommentContent.postId === post.id &&
                    newCommentContent.commentContent
                  ) {
                    this.handleCommentSubmit(post.id);
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
          pageCount={pageCount}
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
  addNamesToPosts: payload => dispatch(postActions.addNamesToPosts(payload)),
  toggleFavouritePost: (id, payload) =>
    dispatch(postActions.toggleFavouritePost(id, payload)),
  addCommentsToPost: (id, payload) =>
    dispatch(commentActions.addCommentsToPost(id, payload)),
  addNewCommentToPost: (id, payload) =>
    dispatch(commentActions.addNewCommentToPost(id, payload))
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
