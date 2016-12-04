import THREE from "../../core/three";
import scene from "../../core/scene";


export default class Box {

    load = () => {

        var geometry = new THREE.BoxGeometry(1, 1, 1);
        var material = new THREE.MeshLambertMaterial({color: 0xff0000});

        var mesh = new THREE.Mesh(geometry, material);

        scene.add(mesh);

    };


}




