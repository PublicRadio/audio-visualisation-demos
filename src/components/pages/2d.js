import {Canvas} from './_Canvas.js';
import {connect} from 'react-redux';

@connect(state => state.Renderer)
export class App extends Canvas {
    static contextName = '2d';

    draw (context, width, height) {
        const buffer = this.props.waveData;
        context.fillStyle = 'rgb(255, 255, 255)';
        context.fillRect(0, 0, width, height);

        context.lineWidth = 1;
        context.strokeStyle = 'rgb(0, 0, 0)';

        context.beginPath();

        let sliceWidth = width * 1.0 / buffer.length;
        let x = 0;

        for (let i = 0; i < buffer.length; i++) {

            let v = buffer[i] / 128.0;
            let y = v * height / 2;

            i === 0 ? context.moveTo(x, y) : context.lineTo(x, y);

            x += sliceWidth;
        }

        context.lineTo(width, height / 2);
        context.stroke();
    }
}