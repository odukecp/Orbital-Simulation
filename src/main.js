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
import { create3DGrid } from './simulation/grid.js';
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
    showLoader('heatmap-1');
    showLoader('heatmap-2');
    showLoader('heatmap-3');

    const start = performance.now();

    await new Promise((resolve) => setTimeout(resolve, 0));

    console.log('Geration initialized.', config);

    // 3D Simulation:
    let points = create3DGrid(config);
    let reduced = subsample(points, config);
    reduced = applyWavefunction(reduced, config);
    reduced = normalize(reduced);
    let filtered = applyThreshold(reduced, config);

    // 3D Rendering:
    renderPoints(filtered, config);

    hideLoader('viewport-wrap');

    // 2D-Sampling
    removeExistingHMCanvases();

    points = create3DGrid(config);
    points = applyWavefunction(points, config);

    let nonXPoints = flattenPoints(points, false, true, true);
    // console.log(nonXPoints);
    // nonXPoints = applyLogValues(nonXPoints);
    nonXPoints = normalize(nonXPoints);
    nonXPoints = adjustCoordinates(nonXPoints, 1);
    let nonXMatrix = pointsToMatrix(nonXPoints, 1);
    // console.log(nonXMatrix);
    createHeatmap(nonXMatrix, 1);
    hideLoader('heatmap-1');

    let nonYPoints = flattenPoints(points, true, false, true);
    nonXPoints = adjustCoordinates(nonYPoints, 2);
    let nonYMatrix = pointsToMatrix(nonYPoints, 2);
    createHeatmap(nonYMatrix, 2);
    hideLoader('heatmap-2');

    let nonZPoints = flattenPoints(points, true, true, false);
    nonZPoints = adjustCoordinates(nonZPoints, 3);
    let nonZMatrix = pointsToMatrix(nonZPoints, 3);
    createHeatmap(nonZMatrix, 3);
    hideLoader('heatmap-3');

    // console.log(nonXPoints[0], nonYPoints[0], nonZPoints[0]);

    const duration = Math.round(performance.now() - start);
    console.log(`\nThe generation-process took \~${duration}ms.\n\n\n`);
}
