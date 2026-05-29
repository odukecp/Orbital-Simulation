import { maxValue } from '../utils/math';

function normalize(points) {
    let max = maxValue(points);

    points.forEach((point) => {
        point.value /= max;
    });

    console.info(`Normalized the values of all points. (Previous maximum was ${max})`);

    return points;
}

export { normalize };
