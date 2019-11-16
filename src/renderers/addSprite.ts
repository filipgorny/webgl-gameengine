import * as THREE from 'three';
import './../../sprites/monsters/rat/s.png';

const cubeWidth = 1;

export function addSprite(renderer: THREE.WebGLRenderer, scene: THREE.Scene, x: number, y: number) {
    // renderer.setPixelRatio(window.devicePixelRatio);

    // var spriteMap = new THREE.TextureLoader().load( './../../sprites/monsters/rat/s.png' );
    // spriteMap.anisotropy = renderer.getMaxAnisotropy();
    
    // var spriteMaterial = new THREE.SpriteMaterial( { map: spriteMap, color: 0xffffff } );
    // spriteMaterial.map.minFilter = THREE.LinearFilter;

    // var sprite = new THREE.Sprite( spriteMaterial );
    // sprite.position.x = x + cubeWidth / 2;
    // sprite.position.z = y + cubeWidth / 2;
    
    // scene.add( sprite );

    // var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    // const loader = new THREE.TextureLoader();
    // var material = new THREE.MeshBasicMaterial( { map: loader.load('./../../sprites/monsters/rat/s.png') } );
    // var cube = new THREE.Mesh( geometry, material );
    // cube.position.x = x * cubeWidth;
    // cube.position.z = y * cubeWidth;

    // scene.add( cube );

    var planeGeometry = new THREE.PlaneGeometry(0.2, 0.2);
    var spriteMap = new THREE.TextureLoader().load( './../../sprites/monsters/rat/s.png' );
    var planeMaterial = new THREE.MeshLambertMaterial({
        map: spriteMap,
        transparent: true
    });
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.position.x = x + cubeWidth / 2;
    plane.position.z = y + cubeWidth / 2;
    plane.position.y = -0.3;

    scene.add(plane);
}