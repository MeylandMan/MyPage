import './style.css'

import * as THREE from 'three';


import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';



// Set the scene

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(72, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

const controls = new OrbitControls( camera, renderer.domElement );
const loader = new GLTFLoader();

renderer.setSize( window.innerWidth/2, window.innerHeight/2);
document.body.appendChild( renderer.domElement );

// Drawing cube
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );


camera.position.z = 2;

// Animate process

function animate() {
	renderer.render( scene, camera );
}
renderer.setAnimationLoop( animate );