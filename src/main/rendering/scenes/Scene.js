import React, {PropTypes} from "react";
import THREE from '../core/three';
import scene from '../core/scene';
import camera from '../core/camera';
import renderer from '../core/renderer';
import controls from '../core/controls';

import Table from '../objects/table/table'
import Chair from '../objects/table/chair'
import Glass from '../objects/table/glass'
import Crosshair from '../objects/crosshair/crosshair'
import Box from '../objects/table/box'

export default class Scene extends React.Component {

    animate = () => {
        requestAnimationFrame(this.animate);
        controls.update();
    };

    renderFrame = () => {
        renderer.render(scene, camera);
    };

    onWindowResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    };

    init = () => {


        var ambient = new THREE.AmbientLight(0x101030, 10);
        scene.add(ambient);

        document.getElementById("scene").appendChild(renderer.domElement);
        window.addEventListener('resize', this.onWindowResize, false);

        controls.addEventListener('change', this.renderFrame);

        var grid = new THREE.GridHelper(1000000, 1000);
        scene.add(grid);

        let crosshair = new Crosshair();
        crosshair.load();

        let table = new Table();
        table.load();

        // let chair = new Chair();
        // chair.load();

        let glass = new Glass();
        glass.load();


        var directionalLight = new THREE.DirectionalLight(0xffeedd, 100);
        directionalLight.position.set(-1000, 10000, 0);
        // directionalLight.target = glass;
        scene.add(directionalLight);

    };

    componentDidMount = () => {
        this.init();
        this.renderFrame();
        this.animate();
    };

    render() {
        return (
            <div id="scene"></div>
        );
    };

}


