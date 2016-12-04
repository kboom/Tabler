import THREE, {OrbitControls} from './three';
import camera from './camera';

camera.position.set(1500, 1500, 1500);
camera.lookAt(new THREE.Vector3());

var controls = new OrbitControls(camera);

export default controls;