import THREE from '../three';
import manager from "./loadingManager";
var OBJLoader = require('three-obj-loader');
OBJLoader(THREE);

var loader = new THREE.OBJLoader(manager);

export default loader;