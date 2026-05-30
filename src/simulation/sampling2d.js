function flattenPoints(points, id) {
    let filtered = [];
    const eps = 5;
    if (id === 1) {
        points.forEach((point) => {
            if (Math.abs(point.x) < eps) {
                filtered.push({
                    x: point.y,
                    y: point.z,
                    value: point.value,
                });
            }
        });
    }

    if (id === 2) {
        points.forEach((point) => {
            if (Math.abs(point.y) < eps) {
                filtered.push({
                    x: point.x,
                    y: point.z,
                    value: point.value,
                });
            }
        });
    }

    if (id === 3) {
        points.forEach((point) => {
            if (Math.abs(point.z) < eps) {
                filtered.push({
                    x: point.x,
                    y: point.y,
                    value: point.value,
                });
            }
        });
    }
    return filtered;
}

export { flattenPoints };
