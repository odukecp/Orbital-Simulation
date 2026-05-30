function applyThreshold(points, config) {
    const threshold = config.threeD.threshold;

    let pointsTreshold = [];
    points.forEach((point) => {
        if (point.value >= threshold) pointsTreshold.push(point);
    });

    console.log(
        `Applying the threshold of ${threshold} sorted out ${points.length - pointsTreshold.length} points.`,
    );
    return pointsTreshold;
}

function subsample(points, config) {
    const reduce = config.threeD.reduce;

    if (reduce === 0) {
        console.log(`Array size reduced by 0 points (0%).`);
        return points;
    }

    let reduced = [];
    points.forEach((point) => {
        if (Math.random() <= 1 - reduce) reduced.push(point);
    });

    console.log(
        `Array size reduced by ${points.length - reduced.length} points (\~${Math.round(100 * ((points.length - reduced.length) / points.length))}%).`,
    );
    return reduced;
}

export { applyThreshold, subsample };
