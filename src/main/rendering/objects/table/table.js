import THREE from '../../core/three';
import scene from '../../core/scene';
import objectLoader from '../../core/loading/objectLoader'
import textureLoader from '../../core/loading/imageLoader'

var table = require('../../../assets/objects/table.obj');
var wood = require('../../../assets/textures/wood.jpg');

export default class Table {

    load = () => {

        var texture = textureLoader.load(wood);


        objectLoader.load(table, function (object) {
            object.traverse(function (child) {
                if (child instanceof THREE.Mesh) {
                    child.material.map = texture;
                    child.material.side = THREE.DoubleSide;
                }
            });

            object.scale.set(1000,1000,1000);
            object.position.set(0,3000,0);

            scene.add(object);
        });

    };



}
