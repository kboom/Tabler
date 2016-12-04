import THREE from '../three';
import manager from "./loadingManager";

var loader = new THREE.JSONLoader(manager);

export default loader;