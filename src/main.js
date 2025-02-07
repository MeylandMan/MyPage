import './style.css'

import * as THREE from 'three'

import WebGL from 'three/addons/capabilities/WebGL.js'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { ThreeMFLoader } from 'three/examples/jsm/Addons.js'


// Set the scene

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(72, window.innerWidth / window.innerHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer({
	canvas: document.querySelector('#bg'),
});

const controls = new OrbitControls( camera, renderer.domElement )
const loader = new GLTFLoader()


document.body.appendChild( renderer.domElement )

//Directional light
const dirLight = new THREE.DirectionalLight(0xffffff, 100);
dirLight.position.set(10, 5, 10);
dirLight.target.position.set(0, 0, 0);
scene.add(dirLight);
scene.add(dirLight.target);


// Drawing Torus
const geometry = new THREE.TorusGeometry( 5, 1, 10, 50 )
const material = new THREE.MeshBasicMaterial( { color: 0xffffff, wireframe: true } )
const torus = new THREE.Mesh( geometry, material )

scene.add( torus );

camera.position.z = 5;

loader.load("../Classic Gun/fps_guns_4k_-_pistol_2 (1).glb", function ( gltf ) {

	const model = gltf.scene;
    model.scale.set(10, 10, 10)
	model.position.set(0, -1, 0)

	scene.add( model )

}, undefined, function ( error ) {

	console.error( error )

} )


// Animate process
if(!WebGL.isWebGL2Available()) {

	const warning = WebGL.getWebGL2ErrorMessage();
	document.getElementById( 'container' ).appendChild( warning );

}



// Initiate function or other initializations here
renderer.setAnimationLoop( () => {
	
	torus.rotation.x += 0.01
	torus.rotation.y += 0.01
	renderer.setPixelRatio( window.devicePixelRatio )
	renderer.setSize( window.innerWidth, window.innerHeight);

	renderer.render( scene, camera );

	}
);


