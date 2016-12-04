import THREE from '../../core/three';
import scene from '../../core/scene';
import objectLoader from '../../core/loading/objectLoader'
import imageLoader from '../../core/loading/imageLoader'
import jsonLoader from '../../core/loading/jsonLoader'

// var glass = require('../../../assets/objects/glass.obj');
var glass = require('../../../assets/objects/glass.json');
var wood = require('../../../assets/textures/wood.jpg');

export default class Glass extends THREE.Mesh {

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

        jsonLoader.load(
            glass,
            function ( geometry, materials ) {
                var material = new THREE.MeshStandardMaterial({
                   color: 0x00ff00
                });

                that.geometry = geometry;
                that.material = material;

                that.scale.set(1000,1000,1000);
                that.position.set(0,5480,0);

                scene.add( that );
            }
        );

    };

}
