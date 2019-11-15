import * as THREE from 'three';
import { addWall } from "./renderers/addWall";
import { CompressedPixelFormat } from 'three';
import { Player } from './game/Player';

const scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const mapData = `
wwwwwwwwwww
w000000000w
w000000000w
w000000000w
wwwwwwwwwww
`;

let map: string[][] = new Array();

const mapLines = mapData.split("\n");
for (let x = 0; x < mapLines.length; x++) {
    map.push(mapLines[x].split(""));
}

for (let x = 0; x < map.length; x++) {
    let line = map[x];

    for (let y = 0; y < map[x].length; y++) {
        if (map[x][y] == "w") {
            addWall(scene, x, y);
        }
    }
}

const player = new Player();
player.character.position.y = 4;
player.character.position.x = 3;

camera.position.z = player.character.position.y;
camera.rotation.y = 1;
camera.position.x = player.character.position.x;

camera.rotation.y = player.character.rotation.value;



const rotationSpeed = 0.01;
var rotationA = 0;
const maxRotationA = 0.05;
const rotationFriction = 0.008;

var ySpeed = 0.03;
var speedA = 0;
const maxSpeed = 0.06;
const speedFriction = 0.02;

const keysPressed: number[] = [];

document.addEventListener("keydown", function onDocumentKeyDown(event: any) {
    var keyCode = event.which;

    if (keysPressed.indexOf(keyCode) < 0) {
        keysPressed.push(keyCode);
    }
});

document.addEventListener("keyup", function onDocumentKeyUp(event: any) {
    var keyCode = event.which;

    keysPressed.splice(keysPressed.indexOf(keyCode), 1);
});

function processKeys() {
    keysPressed.forEach((keyCode) => {
        if (keyCode == 83) {
            if (speedA < maxSpeed) {
                speedA += ySpeed;
            }
        } else if (keyCode == 87) {
            if (speedA > -maxSpeed) {
                speedA -= ySpeed;
            }
        } else if (keyCode == 65) {
            if (rotationA < maxRotationA) {
                rotationA += rotationSpeed;
            }
        } else if (keyCode == 68) {
            if (rotationA > -maxRotationA) {
                rotationA -= rotationSpeed;
            }
        }
    });
}

function animate() {
    camera.position.z = player.character.position.y;
    camera.position.x = player.character.position.x;
    camera.rotation.y = player.character.rotation.value;

    player.character.rotation.value += rotationA;
    player.character.position.y += speedA * Math.cos(player.character.rotation.value);
    player.character.position.x += speedA * Math.sin(player.character.rotation.value);

    processKeys();

    if (rotationA > 0) {
        rotationA -= rotationFriction;

        if (rotationA < 0) {
            rotationA = 0;
        }
    } else if (rotationA < 0) {
        rotationA += rotationFriction;

        if (rotationA > 0) {
            rotationA = 0;
        }
    }

    if (speedA > 0) {
        speedA -= speedFriction;

        if (speedA < 0) {
            speedA = 0;
        }
    } else if (speedA < 0) {
        speedA += speedFriction;

        if (speedA > 0) {
            speedA = 0;
        }
    }

	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}
animate();