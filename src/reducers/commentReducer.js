import types from '../static/reduxTypes';

const INITIAL_STATE = {
  isLoading: false,
  error: null,
  newComments: [],
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // case types.COMMENTS_FETCH_REQUESTED:
    //   return {
    //     ...state,
    //     isLoading: true,
    //   };
    // case types.COMMENTS_FETCH_SUCCEEDED:
    //   return {
    //     ...state,
    //     isLoading: false,
    //     comments: action.payload,
    //   };
    // case types.COMMENTS_FETCH_FAILED:
    //   return {
    //     ...state,
    //     isLoading: false,
    //     error: action.payload,
    //   };
    default:
      return state;
  }
};

export default reducer;
