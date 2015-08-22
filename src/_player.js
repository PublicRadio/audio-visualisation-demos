const AudioContext = window.AudioContext || window.webkitAudioContext;

const xhr = new XMLHttpRequest();
xhr.open('GET', './tracks.txt', false);
xhr.send();
const tracks = xhr.responseText.split('\n').map(track => `/music/${track}`);
export const audio = window.audio = window.audio || Object.assign(document.createElement('audio'), {autoplay: true});
const context = new AudioContext();
const source = context.createMediaElementSource(audio);

export const analyser = Object.assign(context.createAnalyser(), {fftSize: 2048});
export const frequency = 1024;

export const waveData = new Uint8Array(frequency);
export const freqData = new Uint8Array(frequency);

[analyser, context.destination]
    .forEach(destination => source.connect(destination));

['ended', 'error']
    .forEach(eventName => audio.addEventListener(eventName, function nextTrack () {
        tracks.push(tracks.shift());
        Object.assign(audio, {src: tracks[0], currentTrack: tracks[0]}); //todo add real data to currentTrack
    }));

audio.src = tracks[0];
console.log(tracks);
console.log(audio);