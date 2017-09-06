import {createStore,applyMiddleware, compose} from 'redux'
import RootReducer from './reducer'
import Perf from 'react-addons-perf'

const win = window;
win.Perf = Perf;

const middlewares = [];
if (process.env.NODE_ENV !== 'production') {
    middlewares.push(require('redux-immutable-state-invariant')());
}

const storeEnhancers = compose(
    applyMiddleware(...middlewares),
    (win && win.devToolsExtension) ? win.devToolsExtension() : (f) => f,
);

export default createStore(RootReducer, {}, storeEnhancers);