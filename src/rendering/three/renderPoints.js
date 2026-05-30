import * as THREE from 'three';

import { scene } from './setupScene';

let currentPointCloud = null;

function renderPoints(points, config) {
    console.log('Scene created, beginning to render points');

    if (currentPointCloud) {
        scene.remove(currentPointCloud);

        currentPointCloud.geometry.dispose();
        currentPointCloud.material.dispose();
    }

    // Array prep
    const positions = [];
    const colors = [];
    const colormap = config.colors;
    points.forEach((point) => {
        const shift = Math.random() / 5;
        positions.push(point.x + shift, point.y + shift, point.z + shift);

        let cI =
            colormap.length -
            1 -
            Math.round(-Math.log10(point.value) * Math.floor(colormap.length / 2));
        if (cI > colormap.length) cI = colormap.length;
        if (cI < 0) cI = 0;
        colors.push(colormap[cI].r / 255, colormap[cI].g / 255, colormap[cI].b / 255);
    });

    // Geometry
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

    // Material
    const material = new THREE.PointsMaterial({
        size: 0.15,

        transparent: true,
        opacity: 0.3,
        depthWrite: false,
        vertexColors: true,
    });

    // Pointcloud
    const pointCloud = new THREE.Points(geometry, material);

    scene.add(pointCloud);
    currentPointCloud = pointCloud;

    console.log(`Added ${points.length} points to the scene as a pointcloud.`);
}

export { renderPoints };
