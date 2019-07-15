import { createStore, applyMiddleware } from 'redux';
import { composeWithDevtools } from 'redux-devtools-extension';

import rootReducer from './reducers';

const middleware = applyMiddleware();
const withDevtoolsMiddleware = composeWithDevtools(middleware);

export default createStore(rootReducer, withDevtoolsMiddleware);
