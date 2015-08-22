import React, {Component} from 'react';
import {connect} from 'react-redux';

@connect(state => state.Renderer)
export class App extends Component {
    render () {
        return <div className="mdl-grid">
            <div className="mdl-cell mdl-cell--12-col">
                <h1>Визуализация аудио</h1>
                <h3>Web Audio API, Canvas, WebGL и шейдеры</h3>
                <p>
                    <small>Сева Родионов / <a href="//github.com/jabher">github.com/jabher</a></small>
                </p>
                <p>
                    <small><a href="http://publicradio.io">publicradio.io</a></small>
                </p>
                <p><a href="http://github.com/PublicRadio/audio-visualisation-demos">github.com/PublicRadio/audio-visualisation-demos</a></p>
            </div>
        </div>
    }
}