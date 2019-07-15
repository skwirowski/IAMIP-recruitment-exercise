import types from '../static/reduxTypes';

const INITIAL_STATE = {
  isLoading: false,
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
        posts: action.payload,
      };
    case types.POSTS_FETCH_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
