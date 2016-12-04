import THREE from '../../core/three';
import scene from '../../core/scene';
import objectLoader from '../../core/loading/objectLoader'
import imageLoader from '../../core/loading/imageLoader'

var glass = require('../../../assets/objects/glass.obj');
var wood = require('../../../assets/textures/wood.jpg');

export default class Glass extends THREE.Object3D {

    constructor() {
        super();
    }

    load = () => {
        var that = this;
        var texture = new THREE.Texture();


        imageLoader.load(wood, function (image) {
            texture.image = image;
            texture.needsUpdate = true;
        });

        objectLoader.load(glass, function (object) {
            object.traverse(function (child) {
                that.add(child);
            });

            that.scale.set(200,200,200);
            that.position.set(0,5480,0);

            scene.add(that);
        });

    };

}
