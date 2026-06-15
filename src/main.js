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
import { aELAdvSet, aELOrbSelSubmit } from './ui/eventListeners.js';
import { hideLoader, showLoader, updateLoaderText } from './ui/loader.js';
import { removeExistingHMCanvases } from './ui/base.js';
import { createHeatmap } from './rendering/heatmap/createHeatmap.js';
import { realSphericalHarmonic } from './utils/physics.js';
import { analyzeArrayOfObjects } from './utils/math.js';

aELOrbSelSubmit(initGeneration);
aELAdvSet();

async function initGeneration(config) {
    showLoader('viewport-wrap');

    for (let i = 1; i <= 3; i++) {
        showLoader(`heatmap-${i}`);
    }

    const start = performance.now();

    await new Promise((resolve) => setTimeout(resolve, 0));

    console.log('Geration initialized.', config);

    // 3D Simulation:
    updateLoaderText('3D-Raster wird erstellt');
    await nextFrame();
    let points = create3DGrid(config);

    updateLoaderText('Anzahl der Punkte wird reduziert');
    await nextFrame();
    let pointsReduced = subsample(points, config);

    updateLoaderText(`Wellenfunktion wird auf alle ${pointsReduced.length} Punkte angewandt`);
    await nextFrame();
    let pointsWF = applyWavefunction(pointsReduced, config);

    updateLoaderText('Werte werden auf eine Skala von 0 bis 1 projiziert');
    await nextFrame();
    let pointsNormalized = normalize(pointsWF);

    updateLoaderText('Punkte werden gefiltert');
    await nextFrame();
    let pointsThreshold = applyThreshold(pointsNormalized, config);

    // 3D Rendering:
    updateLoaderText('3D-Visualisierung wird vorbereitet');
    await nextFrame();
    renderPoints(pointsThreshold, config);

    updateLoaderText('');
    hideLoader('viewport-wrap');

    // 2D-Sampling
    removeExistingHMCanvases();

    for (let i = 1; i <= 3; i++) {
        generation2d(config, i);
    }

    const duration = Math.round(performance.now() - start);
    console.log(`\nThe generation-process took \~${duration}ms.\n\n\n`);
}

function generation2d(config, id) {
    const points = create2DGrid(config, id);

    const pointsWF = applyWavefunction(points, config);

    const points2d = flattenPoints(pointsWF, id);

    const pointsNormalized = normalize(points2d);

    const pointsAdj = adjustCoordinates(pointsNormalized, id);

    const matrix = pointsToMatrix(pointsAdj, id);

    createHeatmap(matrix, id);

    hideLoader(`heatmap-${id}`);
}

function nextFrame() {
    return new Promise((resolve) => requestAnimationFrame(resolve));
}
