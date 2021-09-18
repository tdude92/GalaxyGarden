// Import Threejs.
import * as THREE from 'three'
import { HabitablePlanet } from 'common/planet/HabitablePlanet';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const planet = new HabitablePlanet()
scene.add( planet.mesh );

camera.position.z = 5;

const animate = function () {
    requestAnimationFrame( animate );

    planet.rotation.x += 0.01;

    renderer.render( scene, camera );
};

animate();