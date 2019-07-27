import types from '../static/reduxTypes';

const INITIAL_STATE = {
  isLoading: false,
  canSetFavouritePosts: false,
  posts: [],
  error: null,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.POSTS_FETCH_REQUESTED:
      return {
        ...state,
        isLoading: true,
      };
    case types.POSTS_FETCH_SUCCEEDED:
      return {
        ...state,
        isLoading: false,
        canSetFavouritePosts: true,
        posts: action.payload,
      };
    case types.POSTS_FETCH_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case types.ADD_COMMENTS_TO_POST:
      return {
        ...state,
        posts: state.posts.map(post => (
          (action.id === post.id) ? { ...post, comments: action.payload } : post)),
      };
    case types.SET_COMMENTS_FETCH_LOADER:
      return {
        ...state,
        posts: state.posts.map(post => (
          (action.id === post.id) ? { ...post, isLoading: action.payload } : post)),
      };
    case types.TOGGLE_FAVOURITE_POST:
      return {
        ...state,
        posts: state.posts.map(post => (
          (action.id === post.id) ? { ...post, isFavourite: action.payload } : post
        )),
      };
    case types.SET_FAVOURITE_POSTS:
      return {
        ...state,
        canSetFavouritePosts: false,
        posts: state.posts.map(post => (
          (action.ids.indexOf(post.id) !== -1) ? { ...post, isFavourite: true } : post
        )),
      };
    default:
      return state;
  }
};

export default reducer;
