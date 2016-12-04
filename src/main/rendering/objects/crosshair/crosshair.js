import THREE from '../../core/three';
import scene from '../../core/scene';

export default class Crosshair {

    load = () => {

        Crosshair.drawX();
        Crosshair.drawY();
        Crosshair.drawZ();

    };

    static drawX() {
        var geometry = new THREE.Geometry();
        geometry.vertices.push(
            new THREE.Vector3(-100000, 0, 0),
            new THREE.Vector3(100000, 0, 0)
        );

        scene.add(new THREE.Line(geometry, new THREE.LineBasicMaterial({
            color: 0x0000ff
        })));
        return geometry;
    }

    static drawY() {
        var geometry = new THREE.Geometry();
        geometry.vertices.push(
            new THREE.Vector3(0, 0, -100000),
            new THREE.Vector3(0, 0, 100000)
        );

        scene.add(new THREE.Line(geometry, new THREE.LineBasicMaterial({
            color: 0xff0000
        })));
        return geometry;
    }

    static drawZ() {
        var geometry = new THREE.Geometry();
        geometry.vertices.push(
            new THREE.Vector3(0, -100000, 0),
            new THREE.Vector3(0, 100000, 0)
        );

        scene.add(new THREE.Line(geometry, new THREE.LineBasicMaterial({
            color: 0x00ff00
        })));
        return geometry;
    }




}
