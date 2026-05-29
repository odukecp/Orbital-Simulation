import { getHeatmapWrap } from '../../ui/base';
import { analyzeArrayOfObjects } from '../../utils/math';

function adjustCoordinates(points, id) {
    const wrap = getHeatmapWrap(id);
    const size = wrap.clientHeight;

    const minX = analyzeArrayOfObjects(points, 'x', false);
    const maxX = analyzeArrayOfObjects(points, 'x');
    const minY = analyzeArrayOfObjects(points, 'y', false);
    const maxY = analyzeArrayOfObjects(points, 'y');

    points.forEach((point) => {
        point.x = ((point.x - minX) / (maxX - minX)) * (size - 1);
        point.y = ((point.y - minY) / (maxY - minY)) * (size - 1);
    });

    return points;
}

function createMatrix(size) {
    return Array.from({ length: size }, () => Array(size).fill(0));
}

function pointsToMatrix(points, id) {
    const size = getHeatmapWrap(id).clientHeight;

    let matrix = createMatrix(size);

    points.forEach((point) => {
        const x = Math.floor(point.x);
        const y = Math.floor(point.y);

        matrix[x][y] = point.value;
    });
    return matrix;
}

export { adjustCoordinates, createMatrix, pointsToMatrix };
