// Import Threejs.
var THREE = require('three');
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { SolarSystem } from '../common/SolarSystem';
import path from 'path';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 55, window.innerWidth / window.innerHeight, 45, 100000 );
camera.position.set(0, 0, 6000);

const renderer = new THREE.WebGLRenderer({preserveDrawingBuffer: true});
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//skybox
const skyboxGeo = new THREE.BoxGeometry(20000, 20000, 20000);
const material = new THREE.MeshBasicMaterial( { color: 0xffff01} );
material.side = THREE.BackSide;
const skybox = new THREE.Mesh( skyboxGeo, material);
scene.add( skybox );

const controls = new OrbitControls(camera, renderer.domElement);
controls.enabled = true;
controls.minDistance = 0;
controls.maxDistance = 100000;
controls.autoRotate = true;
controls.autoRotateSpeed = 0.0;

// biscuit
const ss = new SolarSystem("test", 10000, scene);
let physics_time:number = 0;

const animate = function () {
    controls.update();
    requestAnimationFrame(animate);
    physics_time += 8000;
    ss.step_orbits(physics_time);
    skybox.rotation.y += 0.001;
    renderer.render(scene, camera);
};

animate();

//resize to fullscreen 
window.addEventListener( 'resize', onWindowResize, false );
function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

//download image
var strDownloadMime = "image/octet-stream";
function saveAsImage() {
    var imgData, imgNode;
    try {
        var strMime = "image/jpeg";
        imgData = renderer.domElement.toDataURL(strMime);

        saveFile(imgData.replace(strMime, strDownloadMime), "screenshot.jpg");

    } catch (e) {
        console.log(e);
        return;
    }
}
var saveFile = function (strData:string, filename:string) {
    var link = document.createElement('a');
    if (typeof link.download === 'string') {
        document.body.appendChild(link); //Firefox requires the link to be in the body
        link.download = filename;
        link.href = strData;
        link.click();
        document.body.removeChild(link); //remove the link when done
    } else {
        location.replace(uri);
    }
}

var capture = document.getElementById('take-screenshot');
if (capture)
    capture.onclick = function() {saveAsImage()};
