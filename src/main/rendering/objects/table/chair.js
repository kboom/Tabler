import THREE from '../../core/three';
import scene from '../../core/scene';
import objectLoader from '../../core/loading/objectLoader'
import imageLoader from '../../core/loading/imageLoader'

var chair = require('../../../assets/objects/chair.obj');
var wood = require('../../../assets/textures/wood.jpg');

export default class Chair {

    load = () => {

        var texture = new THREE.Texture();


        imageLoader.load(wood, function (image) {
            texture.image = image;
            texture.needsUpdate = true;
        });

        objectLoader.load(chair, function (object) {
            object.traverse(function (child) {
                if (child instanceof THREE.Mesh) {
                    child.material.map = texture;
                    child.material.side = THREE.DoubleSide;
                }
            });

            object.scale.set(2000,2000,2000);
            object.position.set(-5000,3500,0);

            scene.add(object);
        });

    };



}
