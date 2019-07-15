import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import postActions from './actions/postActions';


class App extends PureComponent {
  componentDidMount() {
    const { fetchPosts } = this.props;
    fetchPosts();
  }

  render() {
    const posts = this.props.state.postReducer.posts;
    console.log(this.props.state.postReducer);
    return (
      <div className="App">
        <ul>
          {posts ? (posts.map(post => (
            <li key={post.id}>{post.body}</li>
          ))) : (
            <li>Loading ...</li>
          )}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({ state });

const mapDispatchToProps = dispatch => ({
  fetchPosts: () => dispatch(postActions.fetchPosts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
