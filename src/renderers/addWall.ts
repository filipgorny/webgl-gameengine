import * as THREE from 'three';

export function addWall(scene: THREE.Scene) {
    var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    const loader = new THREE.TextureLoader();
    var material = new THREE.MeshBasicMaterial( { map: loader.load(import './../../textures/wall/stone1.jpeg') } );
    var cube = new THREE.Mesh( geometry, material );
    scene.add( cube );
}

