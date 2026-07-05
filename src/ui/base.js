import { readConfig } from '../config/readConfig';

function get3DViewport() {
    const v = document.getElementById('viewport-wrap');
    if (!v) throw new Error('Rendering initialization failed, there is no viewport wrap.');

    return v;
}

function getHeatmapWrap(id) {
    const e = document.getElementById(`heatmap-${id}`);
    if (!e) throw new Error('Heatmap generation failed, there is no heastmap wrap.');

    return e;
}

function removeExistingHMCanvases() {
    const canvases = document.querySelectorAll('.heatmap-canvas');
    canvases.forEach((canvas) => {
        canvas.remove();
        console.log('Removed existing canvas.');
    });
}

function addDefaultValues() {
    const formN = document.getElementById('form-n');
    const formL = document.getElementById('form-l');
    const formM = document.getElementById('form-m');

    const config = readConfig();

    formN.value = config.n;
    formL.value = config.l;
    formM.value = config.m;
}

export { get3DViewport, getHeatmapWrap, removeExistingHMCanvases, addDefaultValues };
