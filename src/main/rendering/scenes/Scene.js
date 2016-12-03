import React, {PropTypes} from "react";
import THREE from '../core/three';
import scene from '../core/scene';
import camera from '../core/camera';
import renderer from '../core/renderer';
import controls from '../core/controls';

import Table from '../objects/table/table'
import Box from '../objects/table/box'

export default class Scene extends React.Component {

    animate = () => {
        requestAnimationFrame(this.animate);
        controls.update();
        renderer.render(scene, camera);
    };

    onWindowResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    };

    init = () => {


        var ambient = new THREE.AmbientLight( 0x101030, 1 );
        scene.add( ambient );

        var directionalLight = new THREE.DirectionalLight( 0xffeedd );
        directionalLight.position.set( 0, 0, 1 );
        scene.add( directionalLight );

        document.getElementById("scene").appendChild(renderer.domElement);
        window.addEventListener('resize', this.onWindowResize, false );

        let table = new Table();
        table.load();

        let box = new Box();
        box.load();
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


