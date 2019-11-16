import * as THREE from 'three';
import { addWall } from "./renderers/addWall";
import { CompressedPixelFormat } from 'three';
import { Player } from './game/Player';
import { addFloorAndCeiling } from './renderers/addFloorAndCeiling';
import { addSprite } from './renderers/addSprite';

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
    for (let y = 0; y < map[x].length; y++) {
        if (map[x][y] == "w") {
            addWall(scene, x, y);
        } else {
            addFloorAndCeiling(scene, x, y);
        }
    }
}

addSprite(renderer, scene, 3, 1);

function isWallOnPosition(x: number, y: number) {
    return map[Math.floor(x)][Math.floor(y)] == "w" || map[Math.ceil(x)][Math.ceil(y)] == "w";
}

const player = new Player();
player.character.position.y = 4;
player.character.position.x = 3;

camera.position.z = player.character.position.y;
camera.rotation.y = 1;
camera.position.x = player.character.position.x;

camera.rotation.y = player.character.rotation.value;


var light = new THREE.PointLight( 0xffd099, 7, 3.55 );
light.decay = 4;
light.position.set( 3, 0, 2 );
scene.add( light );
0xff0000

const rotationSpeed = 0.01;
var rotationA = 0;
const maxRotationA = 0.05;
const rotationFriction = 0.008;

var ySpeed = 0.009;
var speedA = 0;
const maxSpeed = 0.03;
const speedFriction = 0.003;

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

var lightIntensivityChange = light.intensity;

function randomLight() {
    lightIntensivityChange = 7 + Math.random() * 1.5 - Math.random() * 1;
}

randomLight();

function tick() {
    light.position.z = camera.position.z = player.character.position.y;
    light.position.x = camera.position.x = player.character.position.x;
    camera.rotation.y = player.character.rotation.value;

    player.character.rotation.value += rotationA;
    let newPlayerYPosition = player.character.position.y + speedA * Math.cos(player.character.rotation.value);
    let newPlayerXPosition = player.character.position.x + speedA * Math.sin(player.character.rotation.value);

    
    if (!isWallOnPosition(newPlayerXPosition, newPlayerYPosition)) {
        player.character.position.y = newPlayerYPosition;
        player.character.position.x = newPlayerXPosition;
    } else if (!isWallOnPosition(player.character.position.x, newPlayerYPosition)) {
        player.character.position.y = newPlayerYPosition;
    } else if (!isWallOnPosition(newPlayerXPosition, player.character.position.y)) {
        player.character.position.x = newPlayerXPosition;
    }

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

    console.log(lightIntensivityChange);
    console.log(light.intensity);

    if (lightIntensivityChange > light.intensity) {
        light.intensity += 0.03;
        console.log('mor');

        if (light.intensity > lightIntensivityChange) {
            randomLight();
        }
    } else if (lightIntensivityChange < light.intensity) {
        light.intensity -= 0.03;
        console.log('les');

        if (light.intensity < lightIntensivityChange) {
            randomLight();
        }
    }

    setTimeout(tick, 1000 / 60);
}

function animate() {


	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}
animate();

tick();