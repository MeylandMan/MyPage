import './style.css';

import * as THREE from 'three';

import WebGL from 'three/addons/capabilities/WebGL.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { ceilPowerOfTwo } from 'three/src/math/MathUtils.js';
//import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
//import { ThreeMFLoader } from 'three/examples/jsm/Addons.js'


// Set the scene

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(72, window.innerWidth / window.innerHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer({
	canvas: document.querySelector('#bg'),
});

const controls = new OrbitControls( camera, renderer.domElement );


document.body.appendChild( renderer.domElement );

//Adding lights
const pointLight = new THREE.PointLight(0xffffff, 100);
pointLight.position.set(5, 5, 5);
const ambiantLight = new THREE.AmbientLight(0xffffff);

const lightHelper = new THREE.PointLightHelper(pointLight);

const gridHelp = new THREE.GridHelper(200, 50);

scene.add( pointLight,  ambiantLight, lightHelper, gridHelp);

// Torus
const geometry = new THREE.TorusGeometry( 5, 1, 10, 50 );
const material = new THREE.MeshStandardMaterial( { color: 0xFF6347} );
const torus = new THREE.Mesh( geometry, material );

scene.add( torus );

camera.position.z = 5;


// Stars 
function AddStar() {
	const geometry = new THREE.SphereGeometry(0.25, 24, 24);
	const material = new THREE.MeshStandardMaterial(0xffffff);
	const star = new THREE.Mesh(geometry, material);

	const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 100 )) ;

	star.position.set(x, y, z);
	scene.add( star );
}

Array(500).fill().forEach(AddStar)

// Animate process
if(!WebGL.isWebGL2Available()) {

	const warning = WebGL.getWebGL2ErrorMessage();
	document.getElementById( 'container' ).appendChild( warning );

}



// Initiate function or other initializations here
renderer.setAnimationLoop( () => {
	
	torus.rotation.x += 0.01
	torus.rotation.y += 0.01
	controls.update()

	renderer.setPixelRatio( window.devicePixelRatio )
	renderer.setSize( window.innerWidth, window.innerHeight);

	renderer.render( scene, camera );

	}
);


