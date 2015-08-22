import {Canvas} from './_Canvas.js';
import {connect} from 'react-redux';

@connect(state => state.Renderer)
export class App extends Canvas {
    static contextName = '2d';

    draw (context, width, height) {
        context.clearRect(0, 0, width, height);
        var waveData = this.props.waveData;
        const length = waveData.length;
        const verticalStep = Math.floor(height / 256);
        const horizontalStep = width / length;
        context.moveTo(0, waveData[0] * verticalStep);
        context.fillStyle = `black`;
        context.beginPath();
        for (var i = 0; i < length; i++) {
            var entry = waveData[i];
            var barHeight = entry * verticalStep;
            context.lineTo(i * horizontalStep, height - barHeight);
        }
        context.stroke();
    }
}