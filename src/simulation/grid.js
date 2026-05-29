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

export { create3DGrid };
