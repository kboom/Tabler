import THREE from '../../core/three';
import scene from '../../core/scene';
import objectLoader from '../../core/loading/objectLoader'
import imageLoader from '../../core/loading/imageLoader'

var table = require('../../../assets/objects/table.obj');
var wood = require('../../../assets/textures/wood.jpg');

export default class Table {

    load = () => {

        var texture = new THREE.Texture();


        imageLoader.load(wood, function (image) {
            texture.image = image;
            texture.needsUpdate = true;
        });

        objectLoader.load(table, function (object) {
            object.traverse(function (child) {
                if (child instanceof THREE.Mesh) {
                    child.material.map = texture;
                    child.material.side = THREE.DoubleSide;
                }
            });

            object.scale.set(10,10,10);
            object.position.set(-10,-10,-10);

            scene.add(object);
        });

    };



}
