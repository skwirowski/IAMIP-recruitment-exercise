import types from '../static/reduxTypes';

const INITIAL_STATE = {
  isLoading: false,
  canSetNewComments: false,
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
    case types.COMMENTS_FETCH_REQUESTED:
      return {
        ...state,
        posts: state.posts.map(post => (
          (action.id === post.id) ? { ...post, isLoading: true } : post)),
      };
    case types.COMMENTS_FETCH_SUCCEEDED:
      return {
        ...state,
        posts: state.posts.map(post => (
          (action.id === post.id) ? (
            {
              ...post,
              isLoading: false,
              comments: action.payload,
            }) : (
            post)
        )),
      };
    case types.COMMENTS_FETCH_FAILED:
      return {
        ...state,
        posts: state.posts.map(post => (
          (action.id === post.id) ? { ...post, isLoading: false, error: action.payload } : post)),
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
    case types.SET_NEW_COMMENTS_TO_POST:
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
