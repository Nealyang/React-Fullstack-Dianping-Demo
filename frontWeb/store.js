import {createStore,applyMiddleware, compose} from 'redux'
import rootReducer from './reducer'
import Perf from 'react-addons-perf'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './rootSaga'

const win = window;
win.Perf = Perf;

const sagaMiddleware = createSagaMiddleware();
const middlewares = [];

const storeEnhancers = compose(
    applyMiddleware(...middlewares,sagaMiddleware),
    (win && win.devToolsExtension) ? win.devToolsExtension() : (f) => f,
);

export default function configureStore(initialState={}) {
    const store = createStore(rootReducer, initialState,storeEnhancers);
    sagaMiddleware.run(rootSaga);
    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept( () => {
            const nextRootReducer = require('./reducer');
            store.replaceReducer(nextRootReducer);
        });
    }
    return store;
}
