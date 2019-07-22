import React, { PureComponent, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ReactPaginate from "react-paginate";

import postActions from "../actions/postActions";
import getComments from "../services/getCommentsAPI";
import Loader from "../components/Loader";
import Post from "../components/Post";

import "./styles/styles.css";

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      resultsOffset: 0,
      resultsLimit: 10
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

  handlePageClick = posts => {
    let selected = posts.selected;
    let offset = Math.ceil(selected * 10);
    const { fetchPosts } = this.props;

    this.setState({ resultsOffset: offset }, () => {
      const { resultsOffset, resultsLimit } = this.state;
      fetchPosts(resultsOffset, resultsLimit);
    });
  };

  onViewCommentsClick = (id) => {
    const { addCommentsToPost } = this.props;
    getComments(id)
      .then(data => addCommentsToPost(id, data))
  }

  render() {
    const { posts, isLoading } = this.props.state;
    console.log("Post Reducer LOG: ", this.props.state);
    return (
      <div className="App">
        {
          isLoading ? (
            <Loader />
          ) : (
            <div>
              {
                posts.map(post => (
                  <Post
                    key={post.id}
                    title={post.title}
                    body={post.body}
                    onViewCommentsClick={() => this.onViewCommentsClick(post.id)}
                    comments={post.comments}
                  />
                ))
              }
            </div>
          )
        }
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

const mapStateToProps = state => ({ state: state.postReducer });

const mapDispatchToProps = dispatch => ({
  fetchPosts: (start, limit) => dispatch(postActions.fetchPosts(start, limit)),
  addCommentsToPost: (id, payload) => dispatch(postActions.addCommentsToPost(id, payload)),
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
