import React, {Component} from 'react';
import {connect} from 'react-redux';

@connect(state => state.Renderer)
export class App extends Component {
    render () {
        return <div className="mdl-grid">
            <div className="mdl-cell mdl-cell--12-col">
                <code style={{whiteSpace: 'pre-wrap'}}>{`
var audio    = document.createElement('audio');
var context  = new AudioContext();
var source   = context.createMediaElementSource(audio);
var analyser = Object.assign(context.createAnalyser(), { fftSize: 2048 });
var waveData = new Uint8Array(512);
var freqData = new Uint8Array(512);

source.connect(analyzer);
source.connect(context.destination);
analyser.getByteTimeDomainData(waveData);
analyser.getByteFrequencyData(freqData);`}
                </code>
            </div>
        </div>
    }
}