/* 
	This is the code that runs the three.js animation code
	on the front page of the website
*/
var THREE = require('three');
var Detector = require('./Detector.js');
var OBJLoader = require('three-obj-loader');
var MTLLoader = require('three-mtl-loader');
var OrbitControls = require('three-orbit-controls')(THREE);
OBJLoader(THREE);

if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

var camera, controls, scene, renderer;

init();
animate();
//render();

function init(){

	scene = new THREE.Scene();

	renderer = new THREE.WebGLRenderer({ alpha: true });
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.setClearAlpha(0x000000, 0);

	var container = document.getElementById( 'container' );
	container.appendChild( renderer.domElement );

	// (field of view, aspect ratio, near clipping plane, far clipping plane)
	camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000 );
	camera.position.z = 1;

	//setting up the mouse controls 
	controls = new OrbitControls( camera, renderer.domElement );
	controls.enableZoom = false;
	controls.enableDamping = true;
	controls.dampingFactor = 0.25;

	//instantiate var for emma model
	//var emma = new THREE.Object3D();
	var objLoader = new THREE.OBJLoader();
	var mtlLoader = new MTLLoader;
	//load a resource

	objLoader.load('../models/emma.obj', 
		function ( object ) {
			
			console.log('loaded object');
			//var material = new THREE.MeshPhongMaterial( { color: 0xffffff, flatShading: true } );
			//object.material = material;
			//scene.add(object);
			
			mtlLoader.load(
				'../models/emma.mtl',
				function ( mtl ) {
					object.material = mtl;
					scene.add(object);
					console.log('loaded material');
				}
			);
			
		}
	);
	
	
	
	var light = new THREE.AmbientLight( 0x404040 ); // soft white light
	scene.add( light );

	window.addEventListener( 'resize', onWindowResize, false );
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	  camera.updateProjectionMatrix();

	  renderer.setSize( window.innerWidth, window.innerHeight );
}

function animate() {
	requestAnimationFrame( animate );
		controls.update(); // required if controls.enableDamping = true, or if controls.autoRotate = true
		render();
}

function render() {
	renderer.render( scene, camera );
}