import {Canvas} from './_Canvas.js';
import {connect} from 'react-redux';
import {Scene, PerspectiveCamera, BoxGeometry, WebGLRenderer, MeshPhongMaterial, Mesh, SpotLight} from 'three';

@connect(state => state.Renderer)
export class App extends Canvas {
    static contextName = 'webgl';

    async prepare (context, width, height) {
        window.target = this;
        const scene = this.scene = new Scene();
        const camera = this.camera = new PerspectiveCamera(75, width / height, 0.1, 1000);
        const renderer = this.renderer = new WebGLRenderer({canvas: this.canvasElement, context});
        renderer.clear();
        renderer.setViewport(0, 0, width, height);
        renderer.shadowMapEnabled = true;


        const historicData = await this.initHistoricData();
        console.log(historicData);
        for (var i = 0; i < historicData.length; i++) {
            var obj = historicData[i];
            for (var j = 0; j < obj.length; j++) {
                const mesh = new Mesh(
                    new BoxGeometry(10, 10, obj[j]),
                    new MeshPhongMaterial({color: 0xffff00}));
                mesh.position.x = (j - obj.length / 2) * 12;
                mesh.position.y = (i - historicData.length / 2) * 12;
                mesh.cashShadow = true;
                mesh.receiveShadow = true;
                scene.add(mesh);
            }
        }
        const light = new SpotLight(0xffffff, 10, 250, Math.PI/2);
        light.position.set(0, 0, 250);
        light.castShadow = true;
        light.shadowMapWidth = 1024;
        light.shadowMapHeight = 1024;

        light.shadowCameraNear = 500;
        light.shadowCameraFar = 40000;
        light.shadowCameraFov = 30;
        scene.add(light);

        this.camera.position.z = 500;
        this.camera.lookAt(this.scene.children[0].position);

        var mouseDown = false;
        var lastMouseX = null;
        var lastMouseY = null;

        this.canvasElement.onmousedown = function handleMouseDown(event) {
            mouseDown = true;
            lastMouseX = event.clientX;
            lastMouseY = event.clientY;
        };

        this.canvasElement.onmouseup = function handleMouseUp(event) {
            mouseDown = false;
        };

        this.canvasElement.onmousemove = function handleMouseMove(event) {
            if (!mouseDown)
                return;

            var newX = event.clientX;
            var newY = event.clientY;

            var deltaX = newX - lastMouseX;
            var deltaY = newY - lastMouseY;
            camera.rotateY(deltaX / 1000);
            camera.rotateX(deltaY / 1000);

            lastMouseX = newX;
            lastMouseY = newY;
        };

    }

    async initHistoricData () {
        if (!window.historicData) {
            window.historicData = [];
            const audio = Object.assign(document.createElement('audio'), {src: window.audio.src});
            const audioContext = new AudioContext();
            const freqData = new Uint8Array(64);
            const analyser = Object.assign(audioContext.createAnalyser(), {fftSize: 2048});
            audioContext.createMediaElementSource(audio).connect(analyser);
            audio.seekTo = function (val, temp) {
                audio.currentTime = val;
                return new Promise(res =>
                    this.addEventListener('seeked', temp = () =>
                        res(this.removeEventListener('seeked', temp))))
            };
            await new Promise(res => audio.addEventListener('canplay', res));
            audio.play();
            for (var i = 0; i < 100; i++) {
                await audio.seekTo(audio.duration * (i / 100));
                console.log(audio.currentTime);
                analyser.getByteFrequencyData(freqData);
                window.historicData.push(new Uint8Array(freqData));
            }
        }
        return window.historicData;
    }

    draw (context, width, height) {
        this.renderer.render(this.scene, this.camera);
    }
}