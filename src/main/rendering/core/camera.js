import THREE from './three';

var camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.z = 10;
camera.position.x = 10;

export default camera;