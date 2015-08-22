import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {App} from './pages/Intro.js';
import {store} from '../store';

export class Wrapper extends Component {
    render () {
        return <Provider store={store}>
            {() => <App />}
        </Provider>;
    }
}

