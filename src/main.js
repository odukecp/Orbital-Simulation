//  ________  ___  ___
// |\   __  \|\  \|\  \
// \ \  \|\  \ \  \\\  \
//  \ \  \\\  \ \   __  \
//   \ \  \\\  \ \  \ \  \
//    \ \_______\ \__\ \__\
//     \|_______|\|__|\|__|         (by Oskar Herzog)
//

import './styles/style.css';
import {
    adjustCoordinates,
    applyLogValues,
    pointsToMatrix,
} from './rendering/heatmap/preparePoints.js';
import { renderPoints } from './rendering/three/renderPoints.js';
import { create2DGrid, create3DGrid } from './simulation/grid.js';
import { normalize } from './simulation/normalization.js';
import { flattenPoints } from './simulation/sampling2d.js';
import { applyThreshold, subsample } from './simulation/threshold.js';
import { applyWavefunction } from './simulation/wavefunction.js';
import { aELOrbSelSubmit } from './ui/eventListeners.js';
import { hideLoader, showLoader } from './ui/loader.js';
import { removeExistingHMCanvases } from './ui/base.js';
import { createHeatmap } from './rendering/heatmap/createHeatmap.js';

aELOrbSelSubmit(initGeneration);

async function initGeneration(config) {
    showLoader('viewport-wrap');

    const start = performance.now();

    await new Promise((resolve) => setTimeout(resolve, 0));

    console.log('Geration initialized.', config);

    // 3D Simulation:
    let points = create3DGrid(config);

    let pointsReduced = subsample(points, config);

    let pointsWF = applyWavefunction(pointsReduced, config);

    let pointsNormalized = normalize(pointsWF);

    let pointsTreshold = applyThreshold(pointsNormalized, config);

    // 3D Rendering:
    renderPoints(pointsTreshold, config);

    hideLoader('viewport-wrap');

    // 2D-Sampling
    removeExistingHMCanvases();

    for (let i = 1; i <= 3; i++) {
        generation2d(config, i);
    }

    // console.log(nonXPoints[0], nonYPoints[0], nonZPoints[0]);

    const duration = Math.round(performance.now() - start);
    console.log(`\nThe generation-process took \~${duration}ms.\n\n\n`);
}

function generation2d(config, id) {
    showLoader(`heatmap-${id}`);

    let points = create2DGrid(config, id);

    let pointsWF = applyWavefunction(points, config);

    let points2d = flattenPoints(pointsWF, id);

    let pointsNormalized = normalize(points2d);

    let pointsAdj = adjustCoordinates(pointsNormalized, id);

    let matrix = pointsToMatrix(pointsAdj, id);

    createHeatmap(matrix, id);

    hideLoader(`heatmap-${id}`);
}
