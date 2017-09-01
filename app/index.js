import React from 'react'
import {render} from 'react-dom'
import BasicExample from './BasicExample'
import {AppContainer} from 'react-hot-loader'

let div = document.createElement('div');
div.setAttribute('id', 'app');
document.body.appendChild(div);

const mountNode = document.getElementById('app');


render(
    <AppContainer>
        <BasicExample/>
    </AppContainer>,
    mountNode
);

if (module.hot && process.env.NODE_ENV !== 'production') {
    module.hot.accept();
}