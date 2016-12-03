import THREE from './three';
import renderer from './renderer';

controls = new THREE.TrackballControls (camera, renderer.domElement);
controls.rotateSpeed = 1.0;
controls.zoomSpeed = 1.2;