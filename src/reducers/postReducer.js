import types from '../static/reduxTypes';

const INITIAL_STATE = {
  postsLoading: false,
  postsLoaded: false,
  posts: [],
  error: null,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.POSTS_FETCH_REQUESTED:
      return {
        ...state,
        postsLoading: true,
        postsLoaded: false,
      };
    case types.POSTS_FETCH_SUCCEEDED:
      return {
        ...state,
        postsLoading: false,
        postsLoaded: true,
        posts: action.payload,
      };
    case types.POSTS_FETCH_FAILED:
      return {
        ...state,
        postsLoading: false,
        postsLoaded: false,
        error: action.payload,
      };
    case types.SET_POSTS_LOADED_FLAG:
      return {
        ...state,
        postsLoaded: action.flag,
      };
    case types.TOGGLE_FAVOURITE_POST:
      return {
        ...state,
        posts: state.posts.map(post => (
          (action.id === post.id) ? { ...post, isFavourite: action.payload } : post
        )),
      };
    case types.ADD_COMMENTS_TO_POST:
      return {
        ...state,
        posts: state.posts.map(post => (
          (action.id === post.id) ? (
            {
              ...post,
              comments: action.payload,
            }) : (
            post)
        )),
      };
    case types.ADD_NEW_COMMENT_TO_POST:
      return {
        ...state,
        posts: state.posts.map(post => (
          (action.id === post.id) ? (
            {
              ...post,
              comments: [...post.comments, action.payload],
            }) : (
            post)
        )),
      };
    default:
      return state;
  }
};

export default reducer;
