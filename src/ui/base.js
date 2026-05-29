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

export { get3DViewport, getHeatmapWrap, removeExistingHMCanvases };
