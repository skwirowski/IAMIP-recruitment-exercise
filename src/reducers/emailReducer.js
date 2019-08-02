import types from '../static/reduxTypes';

const INITIAL_STATE = {
  userEmailLoading: false,
  userEmailLoaded: false,
  userEmail: '',
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.USER_EMAIL_FETCH_REQUESTED:
      return {
        ...state,
        userEmailLoading: true,
        userEmailLoaded: false,
      };
    case types.USER_EMAIL_FETCH_SUCCEEDED:
      return {
        ...state,
        userEmailLoading: false,
        userEmailLoaded: true,
        userEmail: action.payload,
      };
    case types.USER_EMAIL_FETCH_FAILED:
      return {
        ...state,
        userEmailLoading: false,
        userEmailLoaded: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
