import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';

import rootReducer from './reducers';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();
const middleware = applyMiddleware(sagaMiddleware, logger);

const store = createStore(rootReducer, {}, middleware);

export default store;

sagaMiddleware.run(rootSaga);
