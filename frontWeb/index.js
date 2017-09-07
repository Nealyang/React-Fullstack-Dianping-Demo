import React from 'react'
import {render} from 'react-dom'
import {view as DianpingApp} from './components/wrap/index'
import {AppContainer} from 'react-hot-loader'
import {Provider} from 'react-redux'
import configureStore from './store'

let div = document.createElement('div');
div.setAttribute('id', 'app');
document.body.appendChild(div);

const mountNode = document.getElementById('app');
const store = configureStore();
render(
    <AppContainer>
        <Provider store={store}>
            <DianpingApp/>
        </Provider>
    </AppContainer>,
    mountNode
);

if (module.hot && process.env.NODE_ENV !== 'production') {
    module.hot.accept();
}