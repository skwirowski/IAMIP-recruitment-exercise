import { combineReducers } from 'redux';

import postReducer from './postReducer';
import emailReducer from './emailReducer';

export default combineReducers({
  postReducer,
  emailReducer,
});
