import { maxValue } from '../utils/math.js';

function normalize(points) {
    let max = maxValue(points);
    let pointsNormalized = points;

    pointsNormalized.forEach((point) => {
        point.value /= max;
    });

    console.info(`Normalized the values of all points. (Previous maximum was ${max})`);

    return pointsNormalized;
}

export { normalize };
