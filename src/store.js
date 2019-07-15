import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevtools } from 'redux-devtools-extension';

import rootReducer from './reducers';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();
const middleware = applyMiddleware(sagaMiddleware);
const withDevtoolsMiddleware = composeWithDevtools(middleware);

sagaMiddleware.run(rootSaga);

export default createStore(rootReducer, withDevtoolsMiddleware);
