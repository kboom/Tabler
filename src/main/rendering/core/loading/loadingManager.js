import THREE from '../three';

var manager = new THREE.LoadingManager();
manager.onProgress = function ( item, loaded, total ) { };

export default manager;