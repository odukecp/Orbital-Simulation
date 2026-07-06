import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { get3DViewport } from '../../ui/base.js';
import { readConfig } from '../../config/readConfig.js';

const config = readConfig();

const viewportWrap = get3DViewport();
const viewportHeight = viewportWrap.clientHeight;
const viewportWidth = viewportWrap.clientWidth;

// Scene
const scene = new THREE.Scene();

// Axes
const axesLength = config.graphic.size / 2;
const labelScale = 4;
const axesHelper = new THREE.AxesHelper(axesLength);
scene.add(axesHelper);
function createAxisLabel(text) {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;

    const ctx = canvas.getContext('2d');

    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    ctx.fillText(text, 32, 32);

    const texture = new THREE.CanvasTexture(canvas);

    const material = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
    });

    return new THREE.Sprite(material);
}
const xLabel = createAxisLabel('X');
xLabel.position.set(axesLength + labelScale, 0, 0);
xLabel.scale.set(labelScale, labelScale, labelScale);

const yLabel = createAxisLabel('Y');
yLabel.position.set(0, axesLength + labelScale, 0);
yLabel.scale.set(labelScale, labelScale, labelScale);

const zLabel = createAxisLabel('Z');
zLabel.position.set(0, 0, axesLength + labelScale);
zLabel.scale.set(labelScale, labelScale, labelScale);

scene.add(xLabel);
scene.add(yLabel);
scene.add(zLabel);

// Camera
const camera = new THREE.PerspectiveCamera(75, viewportWidth / viewportHeight, 0.1, 1000);
const cameraPosition = config.graphic.size / 2 + 10;
camera.position.x = cameraPosition;
camera.position.y = cameraPosition;
camera.position.z = cameraPosition;

// Renderer
const renderer = new THREE.WebGLRenderer({
    antialias: true,
});
renderer.setSize(viewportWidth, viewportHeight);
viewportWrap.appendChild(renderer.domElement);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.autoRotate = true;
controls.autoRotateSpeed = -config.threeD.rotationspeed;
let inactivityTimer;
function resetInactivityTimer() {
    controls.autoRotate = false;
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(() => {
        controls.autoRotate = true;
        controls.autoRotateSpeed = -config.threeD.rotationspeed;
    }, 3000);
}
controls.addEventListener('start', resetInactivityTimer);

// Animate (Updating)
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();

// Resize-Handler
window.addEventListener('resize', () => {
    camera.aspect = viewportWidth / viewportHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(viewportWidth, viewportHeight);
});

export { camera, controls, scene };
