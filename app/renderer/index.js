// Import Threejs.
var THREE = require('three');
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import path from 'path';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 55, window.innerWidth / window.innerHeight, 45, 100000 );
camera.position.set(1200, -250, 2000);

const renderer = new THREE.WebGLRenderer({preserveDrawingBuffer: true});
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//skybox
const skyboxGeo = new THREE.BoxGeometry(10000, 10000, 10000);
const material = new THREE.MeshBasicMaterial( { color: 0xffff01} );
material.side = THREE.BackSide;
const skybox = new THREE.Mesh( skyboxGeo, material);
scene.add( skybox );

//box
const box = new THREE.BoxGeometry(1000, 1000, 1000);
const materials = new THREE.MeshBasicMaterial( { color: 0x4ddd01 } );
const test = new THREE.Mesh(box, materials)
scene.add(test);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enabled = true;
controls.minDistance = 0;
controls.maxDistance = 100000;
controls.autoRotate = true;
controls.autoRotateSpeed = 1.0;

const animate = function () {
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
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
var saveFile = function (strData, filename) {
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
capture.onclick = function() {saveAsImage()};
