import React, {PropTypes} from "react";
import THREE from '../core/three';
import scene from '../core/scene';
import camera from '../core/camera';
import renderer from '../core/renderer';

var geometry, material, mesh;


export default class Scene extends React.Component {


    animate = () => {
        requestAnimationFrame(this.animate);

        mesh.rotation.x += 0.01;
        mesh.rotation.y += 0.02;

        renderer.render(scene, camera);
    };

    init = () => {

        geometry = new THREE.BoxGeometry(200, 200, 200);
        material = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true});

        mesh = new THREE.Mesh(geometry, material);

        scene.add(mesh);

        document.getElementById("scene").appendChild(renderer.domElement);

    };

    componentDidMount = () => {
        this.init();
        this.animate();
    };

    render() {
        return (
            <div id="scene"></div>
        );
    };

}


