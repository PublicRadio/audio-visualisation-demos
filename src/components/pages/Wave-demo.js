import {Canvas} from './_Canvas.js';
import {connect} from 'react-redux';

@connect(state => state.Renderer)
export class App extends Canvas {
    static contextName = '2d';

    draw (context, width, height) {
        context.clearRect(0, 0, width, height);
        var waveData = this.props.freqData;
        const length = waveData.length;
        const verticalStep = Math.floor(height / 256);
        const horizontalStep = width / length;
        for (var i = 0; i < length; i++) {
            var entry = waveData[i];
            var barHeight = entry * verticalStep;
            context.fillStyle = `hsl(${entry}, ${Math.floor(entry / 2.56)}%, 50%)`;
            context.fillRect(i * horizontalStep, height - barHeight, horizontalStep, height);
        }
    }
}