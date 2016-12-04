import THREE from './three';

var camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 100, 100000);
camera.position.y = 1000;
camera.position.x = 1000;
camera.position.z = 1000;

export default camera;