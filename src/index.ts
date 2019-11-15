import * as THREE from 'three';
import { addWall } from "./renderers/addWall";
import { CompressedPixelFormat } from 'three';

const scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

addWall(scene);

camera.position.z = 4;
camera.rotation.y = 1;
camera.position.x = 3;

function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}
animate();