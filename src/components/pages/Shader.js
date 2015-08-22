import {Canvas} from './_Canvas.js';

import fragmentShader from './shaders/Raw-fragment.glsl';
import vertexShader from './shaders/vertex.glsl';

import {connect} from 'react-redux';

@connect(state => state.Renderer)
export class App extends Canvas {
    static contextName = 'webgl';
    static contextOptions = {
        alpha: false,
        depth: false,
        antialias: false,
        stencil: true,
        premultipliedAlpha: false,
        preserveDrawingBuffer: false
    };

    prepare () {
        const gl = this.canvasContext;
        const buffer = this.buffer = gl.createBuffer();
        gl.flush();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
                -1.0, -1.0,
                +1.0, -1.0,
                -1.0, +1.0,
                +1.0, -1.0,
                +1.0, +1.0,
                -1.0, +1.0]),
            gl.STATIC_DRAW);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);


        const texture = this.texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.bindTexture(gl.TEXTURE_2D, null);

        this.shaderProgram = initShaders(gl);
    }

    draw (gl, width, height) {
        if (!this.props.freqData || !this.props.waveData)
            return;

        const {buffer, texture, shaderProgram} = this;
        const shaderLocation = gl.getAttribLocation(shaderProgram, "aPos");

        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.activeTexture(gl.TEXTURE0);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, this.props.freqData.length, 2, 0, gl.LUMINANCE, gl.UNSIGNED_BYTE, null);

        gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, this.props.freqData.length, 1, gl.LUMINANCE, gl.UNSIGNED_BYTE, this.props.freqData);
        //gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 1, this.props.freqData.length, 1, gl.LUMINANCE, gl.UNSIGNED_BYTE, this.props.waveData);
        gl.useProgram(shaderProgram);
        gl.uniform1i(gl.getUniformLocation(shaderProgram, "iChannel"), 0);
        gl.uniform3f(gl.getUniformLocation(shaderProgram, "iResolution"), width, height, 1.0);

        gl.viewport(0, 0, width, height);

        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.vertexAttribPointer(shaderLocation, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(shaderLocation);

        gl.drawArrays(gl.TRIANGLES, 0, 6);

        gl.disableVertexAttribArray(shaderLocation);
        gl.bindTexture(gl.TEXTURE_2D, null);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
    }
}
function initShaders (gl) {
    const program = gl.createProgram();
    for (let [type, src] of [[gl.VERTEX_SHADER, vertexShader], [gl.FRAGMENT_SHADER, fragmentShader]]) {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, src);
        gl.compileShader(shader);
        gl.attachShader(program, shader);
        gl.deleteShader(shader);
    }

    gl.linkProgram(program);
    return program;
}