import THREE, {TrackballControls} from './three';
import renderer from './renderer';
import camera from './camera';

let controls = new TrackballControls (camera, renderer.domElement);
controls.rotateSpeed = 1.0;
controls.zoomSpeed = 1.2;

export default controls;