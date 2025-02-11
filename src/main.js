import './style.css';

import * as THREE from 'three';

import WebGL from 'three/addons/capabilities/WebGL.js';
import { CustomCamera } from '../src/CustomCamera'

import { ceilPowerOfTwo, radToDeg } from 'three/src/math/MathUtils.js';
import { radians } from 'three/tsl';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
//import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
//import { ThreeMFLoader } from 'three/examples/jsm/Addons.js'
import { Planet } from '../src/Objects/Planet'

// Set the scene

const scene = new THREE.Scene();
const camera = new CustomCamera();

const renderer = new THREE.WebGLRenderer({
	canvas: document.querySelector('#bg'),
});

const controls = new OrbitControls( camera, renderer.domElement );

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize(window.innerWidth, window.innerHeight);


document.body.appendChild( renderer.domElement );

//Adding lights
const pointLight = new THREE.PointLight(0xfdc056, 500);
const ambiantLight = new THREE.AmbientLight(0xffffff);

const lightHelper = new THREE.PointLightHelper(pointLight);

const gridHelp = new THREE.GridHelper(200, 50);

scene.add( pointLight,  ambiantLight, lightHelper, gridHelp);



// Add Texture to scene
const sceneTexture = new THREE.TextureLoader().load('https://canada1.discourse-cdn.com/flex035/uploads/threejs/original/3X/d/5/d521f3d75b2c5133eb2f9ac8b9d34c9753dd87c7.png');
scene.background = sceneTexture;


// Create the sun 
const sunTexture = new THREE.TextureLoader().load('/sun_diffuse.png');

const sun = new Planet(0, sunTexture);

scene.add( sun.mesh )

if(!WebGL.isWebGL2Available()) {

	const warning = WebGL.getWebGL2ErrorMessage();
	document.getElementById( 'container' ).appendChild( warning );

}

const mposition =  new THREE.Vector3(0, 0, 0);

renderer.setAnimationLoop( () => {

	sun.position.set(0, 100, 0);

	sun.
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
