import THREE, {TrackballControls} from './three';
import renderer from './renderer';
import camera from './camera';

let controls = new TrackballControls (camera);
controls.rotateSpeed = 1.0;
controls.zoomSpeed = 1.2;
controls.panSpeed = 0.8;
controls.noZoom = false;
controls.noPan = false;
controls.staticMoving = true;
controls.dynamicDampingFactor = 0.3;
controls.keys = [ 65, 83, 68 ];

export default controls;