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

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize(window.innerWidth, window.innerHeight);

const controls = new OrbitControls( camera, renderer.domElement );


document.body.appendChild( renderer.domElement );

//Adding lights
const pointLight = new THREE.PointLight(0xfdc056, 500);
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

// Add Texture to scene
const sceneTexture = new THREE.TextureLoader().load('https://canada1.discourse-cdn.com/flex035/uploads/threejs/original/3X/d/5/d521f3d75b2c5133eb2f9ac8b9d34c9753dd87c7.png');
scene.background = sceneTexture;


// Create the sun 
const sunTexture = new THREE.TextureLoader().load('/sun_diffuse.png');
const sun = new THREE.Mesh(
	new THREE.SphereGeometry(),
	new THREE.MeshBasicMaterial( { map: sunTexture } )
)

scene.add( sun )

if(!WebGL.isWebGL2Available()) {

	const warning = WebGL.getWebGL2ErrorMessage();
	document.getElementById( 'container' ).appendChild( warning );

}


renderer.setAnimationLoop( () => {
	torus.rotation.x += 0.01;
	torus.rotation.y += 0.01;
	controls.update();

	

	renderer.render( scene, camera );

	}
);

// Re Adjust Viewport
window.addEventListener("resize", () => {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

	renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize(window.innerWidth, window.innerHeight);

});
