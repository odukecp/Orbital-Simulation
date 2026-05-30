import { validateQuantumNumbers, wavefunction } from '../utils/physics.js';

function applyWavefunction(points, config) {
    const { n, l, m } = config;

    validateQuantumNumbers(n, l, m);

    let pointsWF = points;

    pointsWF.forEach((point) => {
        const { x, y, z } = point;

        const r = Math.sqrt(x ** 2 + y ** 2 + z ** 2);
        const theta = Math.acos(z / r);
        const phi = Math.atan2(y, x);

        // console.log(x, y, z, r, theta, phi);

        if (r === 0) {
            const theta = 0;
            const phi = 0;
        }

        point.value = wavefunction(n, l, m, r, theta, phi);
    });

    console.log(`Applied the wavefunction for the (${n}, ${l}, ${m})-orbital to all points.`);

    return pointsWF;
}

export { applyWavefunction };
