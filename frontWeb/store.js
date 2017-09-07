import {createStore,applyMiddleware, compose} from 'redux'
import rootReducer from './reducer'
import Perf from 'react-addons-perf'

const win = window;
win.Perf = Perf;

const middlewares = [];

const storeEnhancers = compose(
    applyMiddleware(...middlewares),
    (win && win.devToolsExtension) ? win.devToolsExtension() : (f) => f,
);

export default function configureStore(initialState={}) {
    const store = createStore(rootReducer, initialState,storeEnhancers);
    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept( () => {
            const nextRootReducer = require('./reducer');
            store.replaceReducer(nextRootReducer);
        });
    }
    return store;
}
