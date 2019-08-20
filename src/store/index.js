import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleWare from 'redux-saga';
import reducer from './reducer';
import musicSaga from '../saga/sagas';

const sagaMiddleWare = createSagaMiddleWare();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(sagaMiddleWare))

const store = createStore(reducer,enhancer);

sagaMiddleWare.run(musicSaga)

export default store;