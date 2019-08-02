import types from '../static/reduxTypes';

const fetchEmail = () => ({
  type: types.USER_EMAIL_FETCH_REQUESTED,
});

export default {
  fetchEmail,
};
