import * as THREE from 'three';
import './../../textures/wall/floor2.jpg';
import './../../textures/wall/floor.jpg';
const cubeWidth = 1;

export function addFloorAndCeiling(scene: THREE.Scene, x: number, y: number) {
    var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    const loader = new THREE.TextureLoader();
    var material = new THREE.MeshLambertMaterial( { map: loader.load('./../../textures/wall/floor2.jpg') } );
    var cube = new THREE.Mesh( geometry, material );
    cube.position.x = x * cubeWidth;
    cube.position.z = y * cubeWidth;
    cube.position.y = cubeWidth;

    scene.add( cube );

    var material = new THREE.MeshLambertMaterial( { map: loader.load('./../../textures/wall/floor.jpg') } );
    var cube = new THREE.Mesh( geometry, material );
    cube.position.x = x * cubeWidth;
    cube.position.z = y * cubeWidth;
    cube.position.y = - cubeWidth;
    
    scene.add( cube );
}
