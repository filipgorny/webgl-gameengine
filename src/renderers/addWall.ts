import * as THREE from 'three';
import './../../textures/wall/stones1.jpeg';

const cubeWidth = 1;

export function addWall(scene: THREE.Scene, x: number, y: number) {
    var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    const loader = new THREE.TextureLoader();
    var material = new THREE.MeshBasicMaterial( { map: loader.load('./../../textures/wall/stones1.jpeg') } );
    var cube = new THREE.Mesh( geometry, material );
    cube.position.x = x * cubeWidth;
    cube.position.z = y * cubeWidth;

    scene.add( cube );
}

