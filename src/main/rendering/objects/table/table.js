import THREE from '../../core/three';
import scene from '../../core/scene';
import objectLoader from '../../core/loading/objectLoader'
import imageLoader from '../../core/loading/imageLoader'


export default class Table {

    load = () => {

        var texture = new THREE.Texture();

        //
        // imageLoader.load('/textures/wood', function (image) {
        //     texture.image = image;
        //     texture.needsUpdate = true;
        // });

        objectLoader.load('/objects/table', function (object) {
            object.traverse(function (child) {
                if (child instanceof THREE.Mesh) {
                    var material = new THREE.MeshLambertMaterial({color: 0xff0000});
                    child.material = material;
                }
            });

            object.scale.set(10,10,10);
            object.position.set(-10,-10,-10);

            scene.add(object);
        });

    };



}
