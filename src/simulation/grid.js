import { getHeatmapWrap } from '../ui/base.js';

function create3DGrid(config) {
    const size = config.graphic.size;
    const count = config.graphic.count;

    const min = -size / 2;
    const max = size / 2;
    const delta = size / count;

    let points = [];

    for (let i = min; i < max; i += delta) {
        for (let j = min; j < max; j += delta) {
            for (let k = min; k < max; k += delta) {
                points.push({
                    x: i,
                    y: j,
                    z: k,
                    value: 0,
                });
            }
        }
    }

    console.info(`Created a 3D-grid with ${points.length} points.`);

    return points;
}

function create2DGrid(config, id) {
    const size = config.graphic.size;
    const count = getHeatmapWrap(id).clientHeight;
    // const count = 4;

    const min = -size / 2;
    const max = size / 2;
    const delta = size / count;

    let points = [];

    let x,
        y,
        z = 1;

    if (id === 1) {
        for (let j = min; j < max; j += delta) {
            for (let k = min; k < max; k += delta) {
                points.push({
                    x: delta / 2,
                    y: j,
                    z: k,
                    value: 0,
                });
            }
        }
    }

    if (id === 2) {
        for (let i = min; i < max; i += delta) {
            for (let k = min; k < max; k += delta) {
                points.push({
                    x: i,
                    y: delta / 2,
                    z: k,
                    value: 0,
                });
            }
        }
    }

    if (id === 3) {
        for (let i = min; i < max; i += delta) {
            for (let j = min; j < max; j += delta) {
                points.push({
                    x: i,
                    y: j,
                    z: delta / 2,
                    value: 0,
                });
            }
        }
    }

    return points;
}

export { create3DGrid, create2DGrid };
