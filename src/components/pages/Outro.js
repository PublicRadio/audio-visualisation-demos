import React, {Component} from 'react';
import {connect} from 'react-redux';

@connect(state => state.Renderer)
export class App extends Component {
    render () {
        return <div>goodbye!</div>
    }
}