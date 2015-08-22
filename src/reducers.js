import * as constants from './constants';
import {analyser, waveData, freqData, frequency} from './_player';
export function Player (state = {}, {type, result} = {}) {
    switch (type) {
        case constants.trackChange:
            return {...state, track: result};
        default:
            return state;
    }
}
export function Renderer (state = {waveData, freqData, frequency}, {type, result} = {}) {
    switch (type) {
        case constants.frameChange:
            analyser.getByteTimeDomainData(waveData);
            analyser.getByteFrequencyData(freqData);
            return {...state, frame: result};
        default:
            return state;
    }
}