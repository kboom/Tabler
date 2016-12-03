import THREE from '../three';
import manager from './loadingManager'

var loader = new THREE.OBJLoader( manager );

export default loader;