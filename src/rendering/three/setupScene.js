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

export { scene };
